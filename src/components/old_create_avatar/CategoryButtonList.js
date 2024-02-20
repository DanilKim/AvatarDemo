import {
    Avatar, 
    Button, 
} from '@mui/material';


export default function CategoryButton(props) {
    const list = []
    for (const [i, product] of props.imagesName.entries()) {
        list.push(<Button
            style={{maxWidth: '200px', maxHeight: '200px'}}
            startIcon={
                <Avatar src={product} />}
            >
        </Button>)
    }

    return (
    <div>
      {list}
    </div>
    )

}