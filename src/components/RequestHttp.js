
import axios from 'axios'
import input from './jsoncomponents/input.json'


function RequestHttp(event, reqdata) {
    for (let i = 0; i < event.target.files.length; i++){
        if (event.target.files[i]) {
            let form = new FormData();

            switch (reqdata) {
                case 'FACECREATE':
                    // 파일 처리
                    form.append('user_id', 'Reacttester');
                    form.append('imgfile', event.target.files[i], 'imagefile.jpg');

                    axios.post('/local/checkfrontface', form)
                        .then(response => {
                            if (response.data.checkfrontface == 'success'){
                                return(response.data);
                                // console.log(response.data)
                            }
                            else{
                                return(response.data);
                                // console.log('No front face')    
                            }
                        })
                        .catch(error => {
                            return (error);
                            // console.log('failed', error)
                        })
                    break;
                
                case 'FACEANIM':
                    form.append('user_id', 'Reacttester');
                    form.append('videofile', event.target.files[i], 'videofile.mp4');
                    console.log(input)
                    form.append("inputjsonfile", new Blob([JSON.stringify(input)], { type: "application/json" }))
                    

                    axios.post('/local/animation', form)
                        .then(response => {
                            console.log(JSON.stringify(response, null, 2))
                            return (JSON.stringify(response, null, 2));
                            // console.log('response : ', JSON.stringify(response, null, 2))
                        })
                        .catch(error => {
                            return (error);
                            // console.log('failed', error)
                        })
                    break;

                case 'BODYANIM':
                    form.append('user_id', 'Reacttester');
                    form.append('videofile', event.target.files[i], 'videofile.mp4');
                    console.log(input)
                    form.append("inputjsonfile", new Blob([JSON.stringify(input)], { type: "application/json" }))


                    axios.post('/local/animation', form)
                        .then(response => {
                            console.log('response : ', JSON.stringify(response, null, 2))
                        })
                        .catch(error => {
                            console.log('failed', error)
                        })
                    break;
                
                default:
                    break;
            }

            

    }
    }

}

export default RequestHttp
