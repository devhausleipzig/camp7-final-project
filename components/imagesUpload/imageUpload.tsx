import React, { useState, useEffect } from "react";
import storage from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNotificationStore } from "../../stores/notificationStore";
import clsx from "clsx";

const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const { send } = useNotificationStore();
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [isActiveDelete, setIsActiveDelete] = useState(false);
  const [isActiveUpload, setIsActiveUpload] = useState(false);

  useEffect(() => {
    if (imageURL) {
      fetch("http://localhost:3000/api/user/images", {
        method: "POST",
        body: JSON.stringify({ imageURL }),
      });
    }
  }, [imageURL]);

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files![0]);
  };

  function deleteHandler() {
    setFile(current => null);
  }

  async function uploadHandler() {
    if (!file) {
      alert("No file selected");
      return;
    }
    const storageRef = ref(storage, `/userImages/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      error => send({ message: "Image upload failed", status: "error" }),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          console.log(url);
          setImageURL(url);
          send({ message: "Image successfully uploaded", status: "info" });
        });
      }
    );
  }

  const handleClickDelete = () => {
    setIsActiveDelete(current => !current);
    setTimeout(() => {
      setIsActiveDelete(false);
    }, 200);
  };

  const handleClickUpload = () => {
    setIsActiveUpload(current => !current);
    setTimeout(() => {
      setIsActiveUpload(false);
    }, 200);
  };

  const deleteButton = () => {
    handleClickDelete();
    deleteHandler();
  };

  const uploadButton = () => {
    handleClickUpload();
    uploadHandler();
  };

  return (
    <section className="bg-[#EEF6EF]">
      <label className="flex justify-center">
        {!file ? (
          <div className="w-[150px] h-[150px] text-white text-lg bg-[url('https://firebasestorage.googleapis.com/v0/b/camp7-18400.appspot.com/o/system%2Favatar_big.png?alt=media&token=4c7cadf8-46ac-4601-8145-c20a4bc48954')] bg-no-repeat ml-2">
            <span className="my-9 mr-2 flex items-center">
              Click here to upload your picture
            </span>
            <input
              type="file"
              name="images"
              onChange={onSelectFile}
              accept="image/png , image/jpeg, image/webp"
              className="hidden"
            />
          </div>
        ) : (
          <div>
            <label htmlFor="file-input">
              <div className="h-[150px] w-[150px] rounded-full">
                <img
                  src={URL.createObjectURL(file)}
                  height="10"
                  alt="upload"
                  className="h-[150px] w-[150px] rounded-full object-cover"
                />
              </div>
            </label>
            <input
              id="file-input"
              type="file"
              name="images"
              onChange={onSelectFile}
              accept="image/png , image/jpeg, image/webp"
              className="hidden"
            />
          </div>
        )}
      </label>

      <br />
      <div className="flex justify-around">
        <button
          className={clsx(
            "disabled:opacity-50",
            isActiveDelete
              ? "w-32 h-10 rounded-lg bg-white text-lg mb-4 text-purple border border-purple"
              : "w-32 h-10 rounded-lg bg-white text-lg mb-4 text-purple"
          )}
          onClick={deleteButton}
          disabled={!file}
        >
          <div className="flex items-center justify-around mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 fill-purple text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            DELETE
          </div>
        </button>
        <button
          className={clsx(
            "disabled:opacity-50",
            isActiveUpload
              ? "w-32 h-10 rounded-lg bg-white text-lg mb-4 text-purple border border-purple"
              : "w-32 h-10 rounded-lg bg-white text-lg mb-4 text-purple"
          )}
          onClick={uploadButton}
          disabled={!file}
        >
          <div className="flex items-center justify-around mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            UPLOAD
          </div>
        </button>
      </div>
    </section>
  );
};

export default ImageUpload;
