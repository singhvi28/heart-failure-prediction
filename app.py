from flask import Flask, render_template, request, redirect, url_for
import pandas as pd
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
try:
    model = joblib.load('heart_disease_model.pkl')
    print("Model loaded successfully!")
except FileNotFoundError:
    print("Error: heart_disease_model.pkl not found. Please ensure the model file is in the same directory as app.py")
    model = None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return "Error: Model not loaded. Please check if heart_disease_model.pkl exists."
    
    try:
        # Get form data
        age = int(request.form['age'])
        sex = request.form['sex']
        chest_pain_type = request.form['chest_pain_type']
        resting_bp = int(request.form['resting_bp'])
        cholesterol = int(request.form['cholesterol'])
        fasting_bs = int(request.form['fasting_bs'])
        resting_ecg = request.form['resting_ecg']
        max_hr = int(request.form['max_hr'])
        exercise_angina = request.form['exercise_angina']
        oldpeak = float(request.form['oldpeak'])
        st_slope = request.form['st_slope']
        
        # Create DataFrame with the same structure as training data
        input_data = pd.DataFrame({
            'Age': [age],
            'Sex': [sex],
            'ChestPainType': [chest_pain_type],
            'RestingBP': [resting_bp],
            'Cholesterol': [cholesterol],
            'FastingBS': [fasting_bs],
            'RestingECG': [resting_ecg],
            'MaxHR': [max_hr],
            'ExerciseAngina': [exercise_angina],
            'Oldpeak': [oldpeak],
            'ST_Slope': [st_slope]
        })
        
        # Make prediction
        prediction = model.predict(input_data)
        prediction_proba = model.predict_proba(input_data)
        
        # Get confidence score
        confidence = max(prediction_proba[0]) * 100
        
        # Redirect based on prediction
        if prediction[0] == 1:
            return redirect(url_for('result_yes', confidence=round(confidence, 2)))
        else:
            return redirect(url_for('result_no', confidence=round(confidence, 2)))
            
    except Exception as e:
        return f"Error in prediction: {str(e)}"

@app.route('/result_yes')
def result_yes():
    confidence = request.args.get('confidence', 'N/A')
    return render_template('result_yes.html', confidence=confidence)

@app.route('/result_no')
def result_no():
    confidence = request.args.get('confidence', 'N/A')
    return render_template('result_no.html', confidence=confidence)

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)