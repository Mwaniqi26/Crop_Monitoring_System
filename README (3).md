# 🌾 Crop Monitoring System

This project is a **Crop Monitoring System** that uses **deep learning** and **image classification** to detect pests in crops, helping farmers make informed decisions and reduce crop damage.

---

## 🚀 Features

- 🧠 TensorFlow.js-based pest image classification
- 📸 Accepts and classifies crop images (e.g., Aphid, Armyworm, Healthy)
- ⚙️ Node.js backend server
- 📡 REST API for image upload and prediction
- 🔧 Easily extensible to include more classes and frontend integration

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- TensorFlow.js (`@tensorflow/tfjs-node`)
- Multer (for handling image uploads)

---

## 📁 Project Structure

```
Crop_Monitoring_System/
├── server/
│   ├── index.js              # Main server file
│   ├── model/
│   │   ├── model.json        # Trained TensorFlow model
│   │   └── weights.bin       # Model weights
│   └── classify.js           # Image classification logic
├── client/                   # (Optional frontend folder)
├── package.json
└── README.md
```

---

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/Mwaniqi26/Crop_Monitoring_System
cd Crop_Monitoring_System/server
```

2. **Install dependencies**

```bash
npm install
```

> If you're having trouble installing `@tensorflow/tfjs-node`, see the troubleshooting section below.

3. **Run the server**

```bash
npm start
```

---

## 📡 API Usage

### `POST /classify`

Upload an image for classification.

- **Request:** `multipart/form-data` with a field named `image`
- **Response:** JSON containing prediction result

#### Example using `curl`

```bash
curl -X POST http://localhost:3000/classify \
  -F image=@path/to/your/crop.jpg
```

#### Example Response

```json
{
  "label": "Aphid"
}
```

---

## 🧪 Model

- Model is stored at: `server/model/model.json`
- It supports the following labels:
  - `Aphid`
  - `Armyworm`
  - `Healthy`

> The model expects images resized to 224x224 and normalized (handled automatically in code).

---

## 🔧 Troubleshooting

### ❌ `@tensorflow/tfjs-node` fails to install

Try the following:

```bash
npm cache clean --force
npm install --global windows-build-tools
npm install @tensorflow/tfjs-node
```

Ensure you have:
- Node.js 18.x (preferably not higher)
- Python 3.x installed
- Visual C++ Build Tools (for Windows users)

---

## 🙌 Contributing

Feel free to submit issues or pull requests. Improvements like additional pest classes or a web UI are welcome.

---

## 📄 License

This project is open-source.

---

## 👨‍🔬 Author

Developed by Alex Mwangi Mwaniki.  
GitHub: [https://github.com/Mwaniqi26]
