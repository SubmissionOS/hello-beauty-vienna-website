# Legt eine lange Ganzseiten-Aufnahme in Spalten nebeneinander (Sichtprüfung).
# Aufruf: powershell -File scripts/columns.ps1 -In <png> -Out <jpg> [-Chunk 1500] [-MaxW 2400]
param([string]$In, [string]$Out, [int]$Chunk = 1500, [int]$MaxW = 2400)
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile($In)
$cols = [Math]::Ceiling($img.Height / $Chunk)
$gap = 12
$w = $cols * $img.Width + ($cols - 1) * $gap
$h = [Math]::Min($Chunk, $img.Height)
$s = [Math]::Min(1.0, $MaxW / $w)
$bmp = New-Object System.Drawing.Bitmap ([int]($w * $s)), ([int]($h * $s))
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::FromArgb(90, 90, 90))
$g.InterpolationMode = 'HighQualityBicubic'
for ($i = 0; $i -lt $cols; $i++) {
  $sy = $i * $Chunk; $sh = [Math]::Min($Chunk, $img.Height - $sy)
  $dest = New-Object System.Drawing.Rectangle ([int](($i * ($img.Width + $gap)) * $s)), 0, ([int]($img.Width * $s)), ([int]($sh * $s))
  $src = New-Object System.Drawing.Rectangle 0, $sy, $img.Width, $sh
  $g.DrawImage($img, $dest, $src, [System.Drawing.GraphicsUnit]::Pixel)
}
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | ? { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 82L
$bmp.Save($Out, $enc, $ep); $g.Dispose(); $bmp.Dispose(); $img.Dispose()
