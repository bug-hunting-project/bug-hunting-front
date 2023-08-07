import React, { useState } from 'react';

const FileUpload = () => {
  const [files, setFiles] = useState({});
  const [isOverlayDraggedOver, setIsOverlayDraggedOver] = useState(false);

  const addFile = (file) => {
    const newFiles = { ...files };
    newFiles[file.objectURL] = file;
    setFiles(newFiles);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsOverlayDraggedOver(false);

    for (const file of event.dataTransfer.files) {
      const isImage = file.type.match('image.*');
      const objectURL = URL.createObjectURL(file);

      addFile({
        objectURL,
        name: file.name,
        size: file.size,
        isImage,
      });
    }
  };

  const handleDragEnter = (event) => {
    event.preventDefault();

    if (event.dataTransfer.types.includes('Files')) {
      setIsOverlayDraggedOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsOverlayDraggedOver(false);
  };

  const handleDragOver = (event) => {
    if (event.dataTransfer.types.includes('Files')) {
      event.preventDefault();
    }
  };

  const handleFileInputChange = (event) => {
    for (const file of event.target.files) {
      addFile({
        objectURL: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        isImage: file.type.match('image.*'),
      });
    }
  };

  const handleFileDelete = (objectURL) => {
    const newFiles = { ...files };
    delete newFiles[objectURL];
    setFiles(newFiles);
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Submitted Files:', files);
  };

  const handleCancel = () => {
    setFiles({});
  };

  return (
    <div className="bg-gray-500 h-96 w-full sm:px-8 md:px-16 sm:py-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        {/* file upload  */}
        <article
          aria-label="File Upload "
          className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDragEnter={handleDragEnter}
        >

          {/* scroll area */}
          <div className="overflow-auto p-8 w-full flex flex-col">
            <div className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
              <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
              </p>
              <input
                id="hidden-input"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileInputChange}
              />
              <button
                id="button"
                className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                onClick={() => document.getElementById('hidden-input').click()}
              >
                Upload a file
              </button>
            </div>

            <h1 className="pt-8 pb-4 font-semibold sm:text-lg text-gray-900">
              To Upload
            </h1>

            <ul
              id="gallery"
              className="flex flex-1 flex-wrap -m-1"
            >
              {Object.keys(files).map((objectURL) => {
                const file = files[objectURL];
                return (
                  <li
                    key={objectURL}
                    id={objectURL}
                    className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8"
                  >
                    <article
                      tabIndex="0"
                      className={`group w-full h-full rounded-md focus:outline-none focus:shadow-outline ${
                        file.isImage ? 'hasImage' : ''
                      } bg-gray-100 cursor-pointer relative ${
                        file.isImage ? 'text-transparent hover:text-white' : ''
                      } shadow-sm`}
                    >
                      {file.isImage && (
                        <img
                          alt="upload preview"
                          className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
                          src={objectURL}
                        />
                      )}

                      <div
                        className={`flex justify-normal rounded-md text-xs break-words w-full z-20 top-0 py-2 px-3 ${
                          file.isImage ? 'bg-transparent' : ''
                        }`}
                      >
                        <div className="flex flex-row justify-between pt-1">
                            <div className="font-semibold pr-4">
                                <h1 className="">
                                {file.name}
                                </h1>
                            </div>
                            <div className="">
                                <p className="size text-xs">
                                    {file.size > 1024
                                    ? file.size > 1048576
                                        ? Math.round(file.size / 1048576) + 'mb'
                                        : Math.round(file.size / 1024) + 'kb'
                                    : file.size + 'b'}
                                </p>
                            </div>
                        </div>
                        <div className="ml-auto">
                          
                          <button
                            className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md"
                            onClick={() => handleFileDelete(objectURL)}
                          >
                            <svg
                              className="pointer-events-none fill-current w-4 h-4 ml-auto"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className="pointer-events-none"
                                d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>

            {/* sticky div */}
            <div className="flex justify-end px-8 pb-8 pt-4">
              <button
                id="submit"
                className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 focus:shadow-outline focus:outline-none"
                onClick={handleSubmit}
              >
                Upload now
              </button>
              <button
                id="cancel"
                className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                onClick={handleCancel}
              >
                Clear All
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default FileUpload;
