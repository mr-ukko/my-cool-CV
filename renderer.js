const tree = document.getElementById("explorerTree");
const editor = document.getElementById("editorContent");
const tabLabel = document.getElementById("tabLabel");
const debugArea = document.getElementById("debugArea");
const lineNumbers = document.getElementById("lineNumbers");
const educationDiv = document.getElementById("education");

fetch("./information.json")
  .then(response => response.json())
  .then(data => {
    data.debugConsoles.forEach(console => {
      const wrapper = document.createElement("div");
      wrapper.className = "debug";

      const header = document.createElement("div");
      header.className = "debug-header";
      header.textContent = console.name;

      const log = document.createElement("div");
      log.className = "debug-log";
      log.innerHTML = console.logs.map(line => `> ${line}`).join("<br>");

      const timeStamp = document.createElement("div");
      timeStamp.className = "debug-time";
      timeStamp.innerHTML = console.timeStamp.map(line => `${line}`).join("<br>");

      wrapper.appendChild(header);
      wrapper.appendChild(timeStamp);
      wrapper.appendChild(log);
      debugArea.appendChild(wrapper);
    });

    data.education.forEach(console => {
      const wrapper = document.createElement("div");
      wrapper.className = "School";

      const header = document.createElement("div");
      header.className = "education-header";
      header.textContent = console.name;

      const log = document.createElement("div");
      log.className = "education-log";
      log.innerHTML = console.logs.map(line => `> ${line}`).join("<br>");

      const timeStamp = document.createElement("div");
      timeStamp.className = "education-time";
      timeStamp.innerHTML = console.timeStamp.map(line => `${line}`).join("<br>");

      wrapper.appendChild(header);
      wrapper.appendChild(timeStamp);
      wrapper.appendChild(log);
      educationDiv.appendChild(wrapper);
    });

    function createNode(node, depth = 0) {
      const li = document.createElement("li");
      li.style.paddingLeft = `${depth * 16}px`;

      if (node.type === "link") {
        li.innerHTML = `<i class="codicon codicon-link"></i> <a href="${node.url}" target="_blank" style="color:inherit; text-decoration:none;">${node.name}</a>`;
        tree.appendChild(li);
      }else if (node.type === "folder") {
        li.innerHTML = `<i class="codicon codicon-chevron-down"></i> ${node.name}`;
        tree.appendChild(li);
        if (node.children) {
          node.children.forEach(child => createNode(child, depth + 1));
        }
      } else if (node.type === "file") {
        li.innerHTML = `<i class="codicon codicon-dash"></i> ${node.name}`;
        li.onclick = () => {
          updateEditorContent(node.tag);
          tabLabel.textContent = node.name;
        };
        tree.appendChild(li);
      }
    }

    function updateEditorContent(content) {
      editor.textContent = content;
      const lines = content.split("\n").length;
      const lineNums = Array.from({ length: lines }, (_, i) => i + 1)
        .map(i => i.toString().padStart(2, " "))
        .join("\n");
      lineNumbers.textContent = lineNums;
    }

    data.structure.forEach(item => createNode(item));
  });
