from flask import Flask, request, jsonify
import pandas as pd
from sklearn.linear_model import LinearRegression
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # To allow requests from your Node.js server

@app.route("/forecast", methods=["POST"])
def forecast():
    try:
        data = request.get_json()  # Expecting list of { amount, date }
        df = pd.DataFrame(data)
        df['date'] = pd.to_datetime(df['date'])
        df['month'] = df['date'].dt.to_period("M").astype(str)

        monthly = df.groupby('month')['amount'].sum().reset_index()
        monthly['month_num'] = range(len(monthly))

        X = monthly[['month_num']]
        y = monthly['amount']

        model = LinearRegression()
        model.fit(X, y)

        next_month = [[len(monthly)]]
        prediction = model.predict(next_month)[0]

        return jsonify({"next_month_forecast": round(prediction, 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run()
