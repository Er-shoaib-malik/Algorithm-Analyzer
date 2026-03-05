


<h1>🚀 Algorithm Analyzer</h1>

<p>
An interactive <b>Algorithm Visualization and Analysis Platform</b> built with
<b>React, Node.js, and Gemini AI</b>.
</p>

<p>
It helps users visualize algorithms step-by-step and understand their
<b>time and space complexity using AI assistance.</b>
</p>

<div class="section">
<h2>✨ Features</h2>

<ul>
<li>Visualize sorting algorithms with animations</li>
<li>Step-by-step algorithm execution</li>
<li>Adjustable speed controls</li>
<li>Pause / Resume execution</li>
<li>AI assistant for algorithm explanations</li>
<li>Complexity analysis using Gemini AI</li>
<li>Interactive bar visualization</li>
<li>Statistics tracking (comparisons, swaps)</li>
</ul>
</div>

<div class="section">
<h2>🧠 Supported Algorithms</h2>

<h3>Sorting</h3>
<ul>
<li>Bubble Sort</li>
<li>Quick Sort</li>
<li>Merge Sort</li>
</ul>

<h3>Searching</h3>
<ul>
<li>Linear Search</li>
<li>Binary Search</li>
</ul>
</div>

<div class="section">
<h2>🖥️ Visualization Concept</h2>

<pre>
Array Bars

  █
  █   █
  █ █ █
  █ █ █ █
━━━━━━━━━━━━
</pre>

<table>
<tr>
<th>Color</th>
<th>Meaning</th>
</tr>

<tr>
<td>🟢 Green</td>
<td>Normal elements</td>
</tr>

<tr>
<td>🔴 Red</td>
<td>Currently comparing</td>
</tr>

<tr>
<td>🟡 Yellow</td>
<td>Sorted element</td>
</tr>

<tr>
<td>🟣 Purple</td>
<td>Pivot (QuickSort)</td>
</tr>
</table>

</div>

<div class="section">
<h2>🤖 AI Assistant</h2>

<p>Users can ask questions like:</p>

<pre>
What is the complexity of Merge Sort?
Explain Binary Search in simple terms
Why is QuickSort faster than Bubble Sort?
</pre>

<p>
The question is sent to the backend API which calls <b>Gemini AI</b>.
</p>

</div>

<div class="section">
<h2>🏗️ Project Architecture</h2>

<div class="flow">
<pre>
User
 │
 ▼
Frontend (React + Tailwind)
 │
 │ API Request
 ▼
Backend (Node.js + Express)
 │
 │ Gemini API Call
 ▼
Google Gemini AI
 │
 ▼
Response → Backend → Frontend
</pre>
</div>
</div>

<div class="section">
<h2>🔁 Application Flow</h2>

<div class="flow">
<pre>
User opens visualizer
        │
        ▼
Select Algorithm
        │
        ▼
Generate Random Array
        │
        ▼
Press Play
        │
        ▼
Algorithm Animations Execute
        │
        ▼
Statistics Update
        │
        ▼
User can ask AI about algorithm
        │
        ▼
Backend sends request to Gemini
        │
        ▼
AI Response displayed
</pre>
</div>
</div>

<div class="section">
<h2>🗂️ Project Structure</h2>

<pre>
algorithm-analyzer
│
├── frontend
│   ├── src
│   │   ├── algorithms
│   │   ├── components
│   │   ├── pages
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend
│   ├── server.js
│   ├── routes
│   └── package.json
│
├── .gitignore
└── README.md
</pre>

</div>

<div class="section">
<h2>⚙️ Tech Stack</h2>

<h3>Frontend</h3>
<ul>
<li>React</li>
<li>Tailwind CSS</li>
<li>Vite</li>
<li>Lucide Icons</li>
</ul>

<h3>Backend</h3>
<ul>
<li>Node.js</li>
<li>Express</li>
<li>Axios</li>
</ul>

<h3>AI</h3>
<ul>
<li>Google Gemini API</li>
</ul>

</div>

<div class="section">
<h2>🔐 Environment Variables</h2>

<p>Create <b>.env</b> inside the backend folder</p>

<pre>
GEMINI_API_KEY=your_api_key_here
</pre>

</div>

<div class="section">
<h2>▶️ Running the Project</h2>

<h3>Clone the repository</h3>

<pre>
git clone https://github.com/yourusername/algorithm-analyzer.git
</pre>

<h3>Install frontend dependencies</h3>

<pre>
cd frontend
npm install
</pre>

<h3>Install backend dependencies</h3>

<pre>
cd backend
npm install
</pre>

<h3>Start backend</h3>

<pre>
node server.js
</pre>

Backend runs on

<pre>
http://localhost:5000
</pre>

<h3>Start frontend</h3>

<pre>
cd frontend
npm run dev
</pre>

Frontend runs on

<pre>
http://localhost:5173
</pre>

</div>

<div class="section">
<h2>📊 Example AI Query</h2>

<pre>
POST /api/ask-ai
</pre>

Request

<pre>
{
 "question": "Explain Merge Sort complexity"
}
</pre>

Response

<pre>
{
 "answer": "Merge sort has O(n log n) time complexity in all cases."
}
</pre>

</div>

<div class="section">
<h2>🎯 Future Improvements</h2>

<ul>
<li>Add more algorithms (Heap Sort, BFS, DFS, Dijkstra)</li>
<li>Graph algorithm visualizations</li>
<li>AI explanation per step</li>
<li>Algorithm comparison mode</li>
<li>Code generation for algorithms</li>
<li>Performance benchmarking</li>
</ul>

</div>

<div class="section">
<h2>⭐ Support</h2>

<p>If you like this project, consider starring the repository.</p>
</div>