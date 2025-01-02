"use client"

import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ImagePlus, Trash } from "lucide-react"
import { useDropzone } from "react-dropzone"

interface ImageUploadProps {
  value: string[]
  onChange: (value: string[]) => void
  onRemove: (value: string) => void
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
}: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Simular upload para um servidor
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            onChange([...value, e.target.result as string])
          }
        }
        reader.readAsDataURL(file)
      })
    },
    [onChange, value]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles: 5,
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
          ${isDragActive ? "border-primary bg-secondary/50" : "border-border"}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <ImagePlus className="h-8 w-8 text-muted-foreground" />
          {isDragActive ? (
            <p>Solte as imagens aqui...</p>
          ) : (
            <>
              <p>Arraste e solte imagens aqui, ou clique para selecionar</p>
              <p className="text-sm text-muted-foreground">
                PNG, JPG, JPEG ou WEBP (máx. 5 arquivos)
              </p>
            </>
          )}
        </div>
      </div>

      {value.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {value.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Imagem ${index + 1}`}
                className="aspect-square w-full rounded-lg object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => onRemove(url)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
