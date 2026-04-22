# AWS CLI Login & SSL Fix (PETRONAS / Zscaler Network)

## Problem

PETRONAS uses Zscaler as a corporate web proxy. Zscaler intercepts HTTPS traffic and re-signs it with its own Root CA certificate. The AWS CLI's default certificate bundle doesn't include the Zscaler Root CA, so all AWS API calls fail with:

```
[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate
```

## Prerequisites

- AWS CLI v2 installed
- Python (via miniforge/conda/pip) installed
- Windows machine on the PETRONAS corporate network (Zscaler active)

## Step 1: Configure AWS CLI credentials

```powershell
aws configure
```

Enter:
- AWS Access Key ID
- AWS Secret Access Key
- Default region: `ap-southeast-1` (or your target region)
- Default output format: `json`

Verify (with SSL bypass for now):

```powershell
aws sts get-caller-identity --no-verify-ssl
```

## Step 2: Locate the CA bundle

Find where Python looks for certificates:

```powershell
python -c "import ssl; print(ssl.get_default_verify_paths())"
```

Typical path on miniforge:

```
C:\Users\<username>\AppData\Local\miniforge3\Library\ssl\cacert.pem
```

## Step 3: Export Zscaler Root CA from Windows certificate store

Open PowerShell and run:

```powershell
$store = New-Object System.Security.Cryptography.X509Certificates.X509Store('Root', 'LocalMachine')
$store.Open('ReadOnly')
$zscalerCerts = $store.Certificates | Where-Object { $_.Subject -like '*Zscaler*' }
$bundle = 'C:\Users\<username>\AppData\Local\miniforge3\Library\ssl\cacert.pem'

foreach ($c in $zscalerCerts) {
    $b64 = [System.Convert]::ToBase64String($c.RawData, 'InsertLineBreaks')
    $thumb = $c.Thumbprint
    $pem = "`n# Zscaler Root CA (Thumbprint: $thumb)`n-----BEGIN CERTIFICATE-----`n$b64`n-----END CERTIFICATE-----`n"
    Add-Content -Path $bundle -Value $pem -Encoding ASCII
    Write-Host "Appended: $($c.Subject) ($thumb)"
}
$store.Close()
```

Replace `<username>` with your Windows username.

## Step 4: Point AWS CLI to the updated bundle

```powershell
aws configure set ca_bundle "C:\Users\<username>\AppData\Local\miniforge3\Library\ssl\cacert.pem"
```

## Step 5: Verify

```powershell
aws sts get-caller-identity
```

Should return your account info with no SSL warnings and no `--no-verify-ssl` flag needed.

## Notes

- You only need to do Steps 3-4 once per machine. The certs persist in the bundle file.
- If miniforge/conda is reinstalled or the cacert.pem is overwritten by an update, re-run Step 3.
- The Zscaler Root CA certs have long expiry dates (2042/2052), so they won't need rotation soon.
- If you see `AccessDenied` errors after fixing SSL, that's an IAM permissions issue, not SSL.
