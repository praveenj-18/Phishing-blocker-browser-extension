from flask import Flask, request, jsonify
from feature import FeatureExtraction  # Assuming you have the FeatureExtraction class
import joblib

app = Flask(__name__)

# Load the trained model using joblib for streaming
def load_model():
    model_path = 'model.pkl'
    model = joblib.load(model_path)
    return model

# Load the model once when the server starts
model = load_model()

@app.route('/check', methods=['GET'])
def check_url():
    try:
        # Get URL from the query parameter
        url = request.args.get('url')

        # Perform feature extraction using FeatureExtraction class
        features_extractor = FeatureExtraction(url)
        features = features_extractor.getFeaturesList()

        # Make a prediction using the trained model
        prediction = model.predict([features])[0]

        return jsonify({'url': url, 'prediction': int(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
