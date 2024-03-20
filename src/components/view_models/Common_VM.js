import React from "react";
import useStore from "../../store/UseStore";

export default function Common_VM() {
  const { common_store, object_store } = useStore();

  const stopAllAnimation = () => {
    for (const object of object_store.metaObjects) {
      object.mixer.stopAllAction();
    }
  };
  const previewBtnHandler = (e) => {
    e.currentTarget.blur();
    console.log(common_store.isPreview);
    if (common_store.isPreview) {
      stopAllAnimation();
      common_store.setIsPreview(false);
      loadAfterPreview();
    } else {
      common_store.setIsPreview(true);
      saveBeforPreview();
    }
  };

  const [prevMetaObjects, setprevMetaObjects] = React.useState([]);
  const saveBeforPreview = async () => {
    let metaObjects = [];

    for (let metaObject of object_store.metaObjects) {
      const metaJson = await metaObject.toJson();
      metaObjects.push(metaJson);
    }
    setprevMetaObjects(JSON.stringify(metaObjects));
  };
  const loadAfterPreview = async () => {
    for (var i = 0; i < object_store.metaObjects.length; i++) {
      common_store.setIsLoading(true);
      await object_store.metaObjects[i].ReConstructor(
        object_store.metaObjects[i].group.children[0],
        JSON.parse(prevMetaObjects)[i]
      );
      common_store.setIsLoading(false);
    }
    setprevMetaObjects([]);
  };

  return {
    previewBtnHandler,
  };
}
