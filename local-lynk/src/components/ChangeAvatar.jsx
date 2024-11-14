// this is for changing the profile picture of the registered user

import { useState } from "react";


function ProfilePictureChanger () {
    const [src, setSrc] = useState(null);
    const [preview, setPreview] = useState(null);

    const onClose = () => {
        setPreview(null);
    }
    const onCrop = view => {
        setPreview(view);
    }

}

export default ProfilePictureChanger