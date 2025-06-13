# Heart Disease Prediction Web Application

A full-stack machine learning web application that predicts heart disease risk using patient medical data. Built with Flask backend and modern responsive frontend.

## 🎯 Project Overview

This project combines comprehensive data analysis with machine learning to create a user-friendly web application for heart disease prediction. The system analyzes 11 medical parameters to provide risk assessment with confidence scores.

## 📊 Dataset Information

**Source**: [Heart Disease Dataset](https://www.kaggle.com/datasets/fedesoriano/heart-failure-prediction) (heart.csv)
- **Total Records**: 918 patients
- **Features**: 11 medical parameters
- **Target**: Heart Disease (0: No, 1: Yes)

### Features Used:
1. **Age**: Patient age in years
2. **Sex**: M (Male), F (Female)
3. **ChestPainType**: ATA, NAP, ASY, TA
4. **RestingBP**: Resting blood pressure (mm Hg)
5. **Cholesterol**: Serum cholesterol (mg/dl)
6. **FastingBS**: Fasting blood sugar > 120 mg/dl (1: Yes, 0: No)
7. **RestingECG**: Normal, ST, LVH
8. **MaxHR**: Maximum heart rate achieved
9. **ExerciseAngina**: Y (Yes), N (No)
10. **Oldpeak**: ST depression induced by exercise
11. **ST_Slope**: Up, Flat, Down

## 🔍 Data Analysis & Key Findings

### Exploratory Data Analysis
- **Statistical Distribution**: Visualized feature distributions (e.g. age, cholesterol, resting BP) using histograms and box plots.
- **Outlier Removal**: Applied to numerical variables for data quality
- **Statistical Testing**: ANOVA and Chi-Square tests performed
- **Correlation Analysis**: Identified key relationships between features

### Statistical Test Results

#### ANOVA Testing (Numerical vs Categorical)
- **RestingBP vs ChestPainType**: p-value = 0.113 (No significant difference)
- **Cholesterol vs ChestPainType**: p-value < 0.001 (Highly significant)
- **MaxHR vs ChestPainType**: p-value < 0.001 (Extremely significant)

#### Chi-Square Testing (Categorical vs Target)
All categorical features showed significant association with Heart Disease (p < 0.05):
- Sex: χ² = 84.15, p < 0.001
- ChestPainType: χ² = 268.07, p < 0.001
- RestingECG: χ² = 10.93, p = 0.004
- ExerciseAngina: χ² = 222.26, p < 0.001
- ST_Slope: χ² = 355.92, p < 0.001

#### Key Correlations
- **Oldpeak ↔ HeartDisease**: +0.4 (Strong positive correlation)
- **MaxHR ↔ HeartDisease**: -0.4 (Strong negative correlation)
- **RestingBP ↔ Cholesterol**: +0.1 (Weak correlation - independent factors)

## 🤖 Machine Learning Models

### Model Performance Comparison

| Model | Training Accuracy | Testing Accuracy |
|-------|------------------|------------------|
| Logistic Regression | 85.69% | 85.87% |
| SVM Classifier | 90.33% | 86.41% |
| Random Forest Classifier (Default) | 100.00% | 86.96% |
| **Random Forest Classifier (Optimized)** | **92.92%** | **88.04%** |
| XG Boost Classifier (Optimized) | - | 88.04% |

### Model Selection Rationale

**Final Model**: Optimized Random Forest Classifier (using GridSearCV)

#### Confusion Matrix Comparison:
```
Random Forest:           XGBoost:
[[66 11]                [[68  9]
 [11 96]]                [13 94]]

False Negatives:         False Negatives:
RF: 11                   XGB: 13
```

**Decision**: Random Forest chosen due to **lower false negatives (11 vs 13)**. In medical diagnosis, minimizing false negatives is critical as missing a positive case (heart disease) has severe consequences.

### Hyperparameter Optimization
Used GridSearchCV with 5-fold cross-validation:
```python
rf_param_grid = {
    'classifier__n_estimators': [100, 200, 300],
    'classifier__max_depth': [3, 5, 10],
    'classifier__min_samples_split': [2, 5, 10],
    'classifier__min_samples_leaf': [1, 2, 4],
    'classifier__max_features': ['sqrt', 'log2']
}
```

## 🚀 Web Application Features

### Backend (Flask)
- **Model Loading**: Seamless integration with trained Random Forest model
- **Data Processing**: Handles form data and preprocessing pipeline
- **Prediction API**: Returns risk assessment with confidence scores
- **Result Routing**: Redirects to appropriate result pages

### Frontend
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Real-time Validation**: Form validation with helpful error messages
- **Progress Tracking**: Visual indicator of form completion
- **Interactive Elements**: Smooth animations and transitions
- **Medical Theming**: Professional healthcare-oriented design

### Key Pages
1. **Home Page**: Interactive form for patient data input
2. **High Risk Result**: Detailed recommendations and emergency information
3. **Low Risk Result**: Preventive care advice and healthy lifestyle tips

## 📁 Project Structure

```
heart-failure-prediction/
│
├── .gitignore                       # Specifies untracked files
├── README.md                       # Project documentation
│
├── app.py                          # Flask application
│
├── templates/
│   ├── index.html                  # Main form page
│   ├── result_yes.html            # High risk result page
│   └── result_no.html             # Low risk result page
│
├── static/
│   ├── css/
│   │   └── style.css              # Responsive styling
│   └── js/
│       └── script.js              # Interactive functionality
|
├── heart_disease_model.pkl         # Trained Random Forest model
|
├── dataset/
│   ├── heart.csv              # Dataset
|
├── requirements.txt                # Python dependencies
|
└── jupyter/
    └── heart_failure.ipynb
```

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.12+
- pip package manager

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/singhvi28/heart-failure-prediction.git
cd heart-disease-prediction
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Run the application**
```bash
python3 app.py
```

4. **Access the application**
Open browser and navigate to: `http://localhost:5000`

## 📦 Dependencies

```
Flask==2.3.3
pandas==2.0.3
scikit-learn==1.3.0
joblib==1.3.2
numpy==1.26.4
Werkzeug==2.3.7
```

## 🔧 Usage

1. **Input Patient Data**: Fill in all 11 medical parameters in the web form
2. **Submit for Prediction**: Click "Predict Heart Disease Risk"
3. **View Results**: Get redirected to risk assessment page with:
   - Prediction result (YES/NO)
   - Confidence score
   - Medical recommendations
   - Lifestyle advice

## 📊 Model Performance Metrics

- **Accuracy**: 88.04%
- **False Negative Rate**: Minimized (11/184 = 5.98%)
- **Cross-validation Score**: 92.92%

## 🏥 Medical Disclaimer

⚠️ **Important**: This application is for educational and research purposes only. It should NOT be used as a substitute for professional medical diagnosis or treatment. Always consult qualified healthcare professionals for medical advice.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

<!--
## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
-->

## 👨‍💻 Author

**Akshit Singhvi**
- GitHub: [@singhvi28](https://github.com/singhvi28)
- LinkedIn: [Akshit Singhvi](https://www.linkedin.com/in/akshit-singhvi/)
- Email: akshitsinghvi28@gmail.com

## 🙏 Acknowledgments

- Dataset source: [Heart Disease Dataset](https://www.kaggle.com/datasets/fedesoriano/heart-failure-prediction)
- Flask documentation and community
- Scikit-learn library contributors
---

<!--
### 📈 Future Enhancements

1. Model Explainability
In real-world healthcare applications, model explainability is key.
Mention using SHAP, LIME, or feature importance plots to explain predictions.
Example: "SHAP values revealed that 'ChestPainType' and 'Oldpeak' were the most influential features in predictions."

- [ ] Integration with electronic health records (EHR)
- [ ] Advanced visualization of risk factors
- [ ] Multi-language support
- [ ] Mobile application development
- [ ] Integration with wearable devices
- [ ] Advanced ensemble methods
- [ ] Real-time monitoring dashboard

-->