# Erzeugt Spaltenbögen für alle Ganzseiten-Aufnahmen unter docs/qa/screenshots (Sichtprüfung).
# Aufruf: powershell -File scripts/columns-all.ps1 -Root docs/qa/screenshots -Out <Zielordner>
param([string]$Root, [string]$Out, [int]$Chunk = 1500, [int]$MaxW = 2400)
Add-Type -AssemblyName System.Drawing
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | ? { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 80L
New-Item -ItemType Directory -Force $Out | Out-Null
$n = 0
Get-ChildItem $Root -Recurse -Filter *.png | Where-Object { $_.Name -notlike 'zustand-*' } | ForEach-Object {
  $rel = $_.FullName.Substring((Resolve-Path $Root).Path.Length + 1) -replace '[\\/]', '__'
  $dst = Join-Path $Out ($rel -replace '\.png$', '.jpg')
  $img = [System.Drawing.Image]::FromFile($_.FullName)
  $cols = [Math]::Ceiling($img.Height / $Chunk)
  $gap = 12
  $w = $cols * $img.Width + ($cols - 1) * $gap
  $h = [Math]::Min($Chunk, $img.Height)
  $s = [Math]::Min(1.0, $MaxW / $w)
  $bmp = New-Object System.Drawing.Bitmap ([Math]::Max(1, [int]($w * $s))), ([Math]::Max(1, [int]($h * $s)))
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.Clear([System.Drawing.Color]::FromArgb(90, 90, 90))
  $g.InterpolationMode = 'HighQualityBicubic'
  for ($i = 0; $i -lt $cols; $i++) {
    $sy = $i * $Chunk; $sh = [Math]::Min($Chunk, $img.Height - $sy)
    $dest = New-Object System.Drawing.Rectangle ([int](($i * ($img.Width + $gap)) * $s)), 0, ([int]($img.Width * $s)), ([int]($sh * $s))
    $src = New-Object System.Drawing.Rectangle 0, $sy, $img.Width, $sh
    $g.DrawImage($img, $dest, $src, [System.Drawing.GraphicsUnit]::Pixel)
  }
  $bmp.Save($dst, $enc, $ep); $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  $n++
}
"sheets: $n"
