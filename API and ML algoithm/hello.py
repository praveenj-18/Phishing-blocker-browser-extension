#import all the necessary packages for the web_phishing_detection
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score
from sklearn import metrics
import pandas as pd
import pickle as pkl
import pandas as pd
#upload the dataset for the model
df=pd.read_csv("dataset_website.csv")
df.drop(columns=["index"],inplace=True)
df.head()
# features
x = df.drop(columns=["Result"])
# target
y = df["Result"]
# spliting the data into training , testing and validating
xtrain, xremain, ytrain, yremain = train_test_split(x, y, test_size=0.2, random_state=42)
xtest, xvalid, ytest, yvalid = train_test_split(xremain, yremain, test_size=0.5)
# using random forest classifier to train the model
model = RandomForestClassifier(random_state=42)
# parameter tuning to increase the accuracy with the help of grid search
param_grid = {
    'n_estimators' : [10, 20, 30],
    'max_depth' : [4, 5, 10],
    'min_samples_split' : [2, 5, 10],
    'min_samples_leaf' : [1, 2, 4]
}
gs = GridSearchCV(model, param_grid, cv=3)
#fit the training data with the model
gs.fit(xtrain, ytrain)
#extracting the best model
best_model = gs.best_estimator_
#load the model to the pickle file to use it in detection application
with open('model.pkl', 'wb') as file:
    pkl.dump(best_model, file)