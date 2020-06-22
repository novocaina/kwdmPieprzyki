import logging
import azure.functions as func
from skimage import io
import os
from skimage.transform import resize
from keras.preprocessing.image import ImageDataGenerator
from keras.models import load_model
from azure.storage.blob.blobservice import BlobService


def main(myblob: func.InputStream):
    dirname = os.path.dirname(__file__)
    path = os.path.join(dirname,"newmodel4.h5")
    model = load_model(path)
    image = load_image(myblob.uri)
    # wartość predykcji zakres 0-1
    prediction = model.predict(image)
    logging.info(prediction)
    # etykieta 0 lub 1 po progowaniu
    label = (prediction>0.6)*1
    logging.info(label)

    blob_service = BlobService(account_name='moles', 
    account_key='H/ZnGu3qNIbvUQdghbt4uuCSJUR/O6ERvSWDeBwJJujKnDfAzSkql3GuKFFq14kQGfk/cxy6InES1rC6vLsbKg==')
    
    blobname = myblob.name.split('/')
    name = blobname[1] + '/' + blobname[2]
    metadata = blob_service.get_blob_metadata(container_name = "images", blob_name = name)
    blob_service.set_blob_metadata(container_name="images",
                               blob_name=name,
                               x_ms_meta_name_values={"Prediction":str(label[0][0])})


def load_image(filename, size=(128,128)):
    img = io.imread(filename)
    img = resize(img, size, mode='constant') * 255
    if img.shape[2] == 4:
        img = img[:,:,0:3]
    return img.reshape(1, size[0], size[1], 3)
