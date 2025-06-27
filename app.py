from flask import Flask, request, jsonify, render_template
import yagmail
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

EMAIL = os.environ.get('EMAIL')  # Replace with your actual email
PASSWORD = os.environ.get('EMAIL_PASSWORD')  # Replace with your actual password

yag = yagmail.SMTP(EMAIL, PASSWORD)


@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    nome = data.get('nome')
    email = data.get('email')
    mensagem = data.get('mensagem')

    if not nome or not email or not mensagem:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        yag.send(to=email, subject=nome, contents=mensagem)
        return jsonify({'message': 'Email sent successfully!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)