"use client"

import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ImagePlus, Trash } from "lucide-react"
import { useDropzone } from "react-dropzone"

interface ImageUploadProps {
  value: Array<{ url: string; position: number }>
  onChange: (value: Array<{ url: string; position: number }>) => void
  onRemove: (url: string) => void
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
}: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Simular upload para um servidor
      acceptedFiles.forEach((file, index) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            onChange([
              ...value,
              {
                url: e.target.result as string,
                position: value.length + index,
              },
            ])
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
          <ImagePlus className="h-6 w-6" />
          <div className="text-sm">
            {isDragActive ? (
              <p>Solte as imagens aqui</p>
            ) : (
              <p>
                Arraste e solte imagens aqui, ou clique para selecionar
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {value.map((image) => (
          <div
            key={image.url}
            className="relative aspect-square rounded-lg overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.url}
              alt="Uploaded"
              className="object-cover w-full h-full"
            />
            <Button
              type="button"
              onClick={() => onRemove(image.url)}
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
