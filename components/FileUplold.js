import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [isOverlayDraggedOver, setIsOverlayDraggedOver] = useState(false);

  const router = useRouter();

  const handleDrop = (event) => {
    event.preventDefault();
    setIsOverlayDraggedOver(false);

    const newFiles = Array.from(event.dataTransfer.files);

    setFiles([...files, ...newFiles]);
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
    const newFiles = Array.from(event.target.files);

    setFiles([...files, ...newFiles]);
  };

  const handleFileDelete = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // 파일들을 FormData에 개별적으로 추가
      files.forEach((file, index) => {
        var ret = formData.append(`file`, file);
        console.log("ret :", ret)
      });

      // FormData의 key 확인
      for (let key of formData.keys()) {
        console.log(key);
      }

      // FormData의 value 확인
      for (let value of formData.values()) {
        console.log(value);
      }

      // POST 요청을 보낼 API 엔드포인트 URL을 설정합니다.
      const apiUrl = 'http://54.180.109.131:5000/sbom/upload';

      // Axios를 사용하여 POST 요청을 보냅니다.
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // FormData를 사용하는 경우 헤더 설정
        },
      });

      const text = JSON.stringify(response.data);

      // 정규표현식을 사용하여 UUID 추출
      const uuidRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
      const extractedUUID = text.match(uuidRegex);

      // POST 요청이 성공하면 응답 데이터를 처리합니다.
      console.log('POST 요청이 성공하였습니다.', response.data);
      Cookies.set('scanID', extractedUUID)
      // 응답 데이터를 사용하여 '/dashboard' 페이지로 이동합니다.
      router.push('/dashboard');
    } catch (error) {
      // POST 요청이 실패한 경우 에러를 처리합니다.
      console.error('POST 요청이 실패하였습니다.', error);
    }
  };

  const handleCancel = () => {
    setFiles([]);
  };

  return (
    <div className="bg-gray-500 h-96 w-full">
      <div className="container mx-auto max-w-screen-lg h-full">
        {/* file upload  */}
        <article
          aria-label="File Upload "
          className="relative h-full flex flex-col bg-white shadow-xl"
          // onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDragEnter={handleDragEnter}
        >

          {/* scroll area */}
          <div className="overflow-auto px-8 w-full flex flex-col h-50">
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
                      className={`group w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative shadow-sm`}
                    >

                      <div
                        className={`flex justify-normal rounded-md text-xs break-words w-full z-20 top-0 py-3 px-3 `}
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
                        <div className="mr-0">
                          
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
                className="rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
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
