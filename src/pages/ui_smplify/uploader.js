import {useEffect, useState} from 'react';
import "./uploader.css";
import {Button} from "@mui/material";
import axios from 'axios';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from '@mui/material/CircularProgress';
import { Center } from '@react-three/drei';
import useStore from "../../store/UseStore";

const Uploader = ({ ...props }) => {
  const { smplify_store } = useStore();

  const default_img_path = "/static/images/avatar_body.png";
  const [loading, setLoading] = useState(false);
  const loadingSize = 40;

  const [image, setImage] = useState({
    image_file_1: "",
    preview_URL_1: default_img_path,
    image_file_2: "",
    preview_URL_2: default_img_path,

  });

  let inputRef_1;
  let inputRef_2;

  const handleCloseLoading = () => {
    setLoading(false);
  }

  const saveImage_1 = (e) => {
    e.preventDefault();
    console.log("SaveImage1");
    if(e.target.files[0]){
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);  // 여기서 URL 이랑 file 이랑 연결시키는 역할을 하는듯
      setImage(() => (
        {
          image_file_1: e.target.files[0],
          preview_URL_1: preview_URL,
          image_file_2: image.image_file_2,
          preview_URL_2: image.preview_URL_2
        }
      ))
    }
  }

  const saveImage_2 = (e) => {
    e.preventDefault();
    console.log("SaveImage2");
    if(e.target.files[0]){
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);  // 여기서 URL 이랑 file 이랑 연결시키는 역할을 하는듯
      setImage(() => (
        {
          image_file_1: image.image_file_1,
          preview_URL_1: image.preview_URL_1,
          image_file_2: e.target.files[0],
          preview_URL_2: preview_URL
        }
      ))
    }
  }

  const deleteImage = () => {
    // createObjectURL()을 통해 생성한 기존 URL을 폐기
    URL.revokeObjectURL(image.preview_URL);
    setImage({
      image_file_1: "",
      preview_URL_1: default_img_path,
      image_file_2: "",
      preview_URL_2: default_img_path,
    });
  }

  useEffect(()=> {
    // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
    return () => {
      URL.revokeObjectURL(image.preview_URL)
    }
  }, [])

  const sendImageToServer = async () => {
    // && 으로 체크하는 부분 바꿔야할수도 있음
    if (image.image_file_1 && image.image_file_2) {
      setLoading(true);

      /*
      Generate Avatar from input images
      */
      const formData = new FormData()
      formData.append('front_body', image.image_file_1);
      formData.append('back_body', image.image_file_2);
      
      try {
        const response = await axios({
          method: "POST",
          url:"http://222.122.67.140:52222/post",
          headers: { "content-type": "multipart/form-data" },
          data: formData
        });

        console.log(response);
      }
      catch (err)
      {
        console.log(err);
      }

      /*
      Get generated avatar from server
      */
      try {
        const response = await axios({
          method: "POST",
          url:"http://222.122.67.140:52222/get_model",
          headers: { "content-type": "multipart/form-data" },
          responseType: "blob"
        });

        const blob = new Blob([response.data]);
        const fileObjectUrl = window.URL.createObjectURL(blob);
        smplify_store.setObjPath(fileObjectUrl);
        // const link = document.createElement("a");
        // link.href = fileObjectUrl;
        // link.style.display = "none";
        // // link.download = response.headers['content-disposition'];
        // link.download = "test_name.glb";
        // document.body.appendChild(link);
        // link.click();
        // link.remove();
        // window.URL.revokeObjectURL(fileObjectUrl);
      }
      catch (err)
      {
        console.log(err);
      }

      alert("생성이 완료되었습니다!");
      setImage({
        image_file_1: "",
        preview_URL_1: default_img_path,
        image_file_2: "",
        preview_URL_2: default_img_path,
      });
      setLoading(false);
    } else {
      alert("사진을 등록하세요!")
    }
  }

  return (
    <div className="uploader-wrapper">
      <input type="file" accept="image/*"
             onChange={saveImage_1}
             // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
             // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
             onClick={(e) => e.target.value = null}
             ref={refParam => inputRef_1 = refParam}
             style={{display: "none"}}
      />
      
      <input type="file" accept="image/*"
             onChange={saveImage_2}
             // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
             // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
             onClick={(e) => e.target.value = null}
             ref={refParam => inputRef_2 = refParam}
             style={{display: "none"}}
      />

      <div className="img-wrapper">
        <img src={image.preview_URL_1}/>
        <img src={image.preview_URL_2}/>
      </div>

      <div className="upload-button">
        <Button type="primary" variant="contained" onClick={() => inputRef_1.click()}>
          Register Front Body
        </Button>
        <Button type="primary" variant="contained" onClick={() => inputRef_2.click()}>
          Register Back Body
        </Button>
        <Button color="error" variant="contained" onClick={deleteImage}>
          Delete
        </Button>
        <Button color="success" variant="contained" onClick={sendImageToServer}>
          Upload
        </Button>
      </div>

      <Dialog open={loading}>
        <DialogTitle>생성중</DialogTitle>
        <DialogContent>
          <CircularProgress
            size={loadingSize}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: `${-loadingSize/2}px`,
              marginLeft: `${-loadingSize/2}px`
          }}>
          </CircularProgress>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleCloseLoading}>취소</Button> */}
        </DialogActions>
      </Dialog>
      
    </div>
  );
}

export default Uploader;