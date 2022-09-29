import pyshorteners as shr

short = shr.Shortener()

url = input("Ingresa la URL: ") # Este campo estará el botón que copiará la URL.d

urlShort = short.tinyurl.short(url)

print(f"{urlShort}") # Este campo copiará y pegará en el portapapeles la URL acortada.