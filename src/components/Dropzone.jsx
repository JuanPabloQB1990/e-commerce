import React, { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'

const Dropzone = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const onDrop = useCallback(acceptedFiles => {
        setSelectedImages(acceptedFiles.map(file => {
            Object.assign(file, {
                preview:URL.createObjectURL(file)
            })
        }))
        // Do something with the files
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

      const selected_images = selectedImages?.map(file => {
        <div>
            <img src={file.preview} style={{width:"200px"}} alt=""/>
        </div>
      })
    
      return (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
  )
}

export default Dropzone
