from keras.preprocessing.image import ImageDataGenerator
from keras.models import load_model
from moleimages import MoleImages
from sklearn.metrics import classification_report
from sklearn.metrics import roc_curve, auc

import matplotlib.pyplot as plt
import sys
import os
import glob

def plot_roc(y_test, y_score, title='ROC Curve'):
    fpr, tpr, _ = roc_curve(y_test, y_score)
    roc_auc = auc(fpr, tpr)
    print(roc_auc)
    plt.figure()
    lw = 2
    plt.plot(fpr, tpr, color='darkorange',
             lw=lw, label='ROC curve (area = %0.2f)' % roc_auc)
    plt.plot([0, 1], [0, 1], color='navy', lw=lw, linestyle='--')
    plt.xlim([0.0, 1.0])
    plt.ylim([0.0, 1.05])
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title(title)
    plt.legend(loc="lower right")
    plt.savefig(title + '.png')
    plt.show()

if __name__ == '__main__':
    if len(sys.argv) == 3:
        pathToBenign = 'datasets/test/benign/'
        pathToMalign = 'datasets/test/malign/'
        mimg = MoleImages()
        
        X_benign = []
        Y_benign = []
        path = os.path.join(pathToBenign, '*.jpg')
        image_list = glob.glob(path)
        n_count = len(image_list)
        print('Ilość obrazów typu łagodnego:'+ str(n_count))
        for i, pathToFile in enumerate(image_list):
            image= mimg.load_image(pathToFile)
            X_benign.append(image)
            Y_benign.append(0)
            print(pathToFile)


        X_malign = []
        Y_malign = []
        path = os.path.join(pathToMalign, '*.jpg')
        image_list = glob.glob(path)
        n_count = len(image_list)
        print('Ilość obrazów typu łagodnego:'+ str(n_count))
        for i, pathToFile in enumerate(image_list):
            image= mimg.load_image(pathToFile)
            X_malign.append(image)
            Y_malign.append(1)
            print(pathToFile)

        X = X_benign + X_malign
        Y = Y_benign + Y_malign

        model = load_model(sys.argv[1])

        PREDICTIONS = []
        images_count = len(X)
        counter=0
        for image in X:
            print('PREDYKCJA. Progress :' + str((counter/images_count)*100) + '%')
            prediction = model.predict(image)
            pred = (prediction>0.5)*1
            PREDICTIONS.append(pred[0][0])
            counter=counter+1
        print('PREDYKCJA. Progress :' + str(100) + '%')

        report = classification_report(Y, PREDICTIONS)
        print(report)

    else:
        print('use python src/test_model.py models/newmodel.h5 newmodel')
