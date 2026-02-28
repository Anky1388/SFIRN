from flask import Flask, request, jsonify
import pandas as pd
import joblib
import os
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score

app = Flask(__name__)

MODEL_PATH = 'sfirn_model.pkl'

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "SFIRN ML Service is Running"})

@app.route('/train', methods=['POST'])
def train():
    try:
        data = request.json['data']
        df = pd.DataFrame(data)

        # Roadmap Features (Section 4.1)
        features = ['attendance', 'day_of_week', 'meal_type_encoded',
                    'is_holiday', 'week_of_month', 'avg_surplus_7d', 'season']

        X = df[features]
        y = df['target_surplus_kg']

        # Default: Linear Regression (Roadmap Section 4.4)
        model = LinearRegression()
        model.fit(X, y)

        # Check performance, upgrade if needed
        score = r2_score(y, model.predict(X))
        if score < 0.75:
            model = RandomForestRegressor(n_estimators=100, random_state=42)
            model.fit(X, y)
            score = r2_score(y, model.predict(X))

        joblib.dump(model, MODEL_PATH)
        return jsonify({'status': 'trained', 'r2_score': float(score)})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if not os.path.exists(MODEL_PATH):
            return jsonify({"error": "Model not trained yet"}), 400

        model = joblib.load(MODEL_PATH)
        data = request.json
        X = pd.DataFrame([data])

        prediction = model.predict(X)[0]
        return jsonify({'predicted_surplus_kg': float(max(0, prediction))})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(port=5001, debug=True)
