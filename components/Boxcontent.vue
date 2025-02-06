<template>
  <div class="input-container">
    <div class="toolbar">
      <button class="toolbar-button" @click="execCommand('bold')" title="Bold">
        <i class="fa-solid fa-bold"></i>
      </button>
      <button
        class="toolbar-button"
        @click="execCommand('italic')"
        title="Italic"
      >
        <i class="fa-solid fa-italic"></i>
      </button>
      <button
        class="toolbar-button"
        @click="execCommand('underline')"
        title="Underline"
      >
        <i class="fa-solid fa-underline"></i>
      </button>
      <button class="toolbar-button" @click="insertLink" title="Insert Link">
        <i class="fa-solid fa-link"></i>
      </button>
      <button
        class="toolbar-button"
        @click="execCommand('insertUnorderedList')"
        title="Bullet List"
      >
        <i class="fa-solid fa-list-ul"></i>
      </button>
      <button
        class="toolbar-button"
        @click="execCommand('insertOrderedList')"
        title="Numbered List"
      >
        <i class="fa-solid fa-list-ol"></i>
      </button>
      <button class="toolbar-button" @click="execCommand('undo')" title="Undo">
        <i class="fa-solid fa-undo"></i>
      </button>
      <button class="toolbar-button" @click="execCommand('redo')" title="Redo">
        <i class="fa-solid fa-redo"></i>
      </button>
    </div>
    <div
      class="editor-field"
      contenteditable="true"
      :placeholder="placeholder"
      @input="updateValue"
      @paste="handlePaste"
      ref="editor"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const editor = ref(null);

// Watch for changes in modelValue and update editor content
watch(
  () => props.modelValue,
  (newValue) => {
    if (editor.value && editor.value.innerHTML !== newValue) {
      editor.value.innerHTML = newValue;
    }
  },
  { immediate: true }
);

const execCommand = (command, value = null) => {
  document.execCommand(command, false, value);
  editor.value.focus();
  updateValue();
};

const insertLink = () => {
  const url = prompt("Enter URL:");
  if (url) {
    execCommand("createLink", url);
  }
};

const handlePaste = (e) => {
  e.preventDefault();
  const text = e.clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);
};

const updateValue = () => {
  if (editor.value) {
    emit("update:modelValue", editor.value.innerHTML);
  }
};

onMounted(() => {
  if (props.modelValue) {
    editor.value.innerHTML = props.modelValue;
  }
});
</script>

<style scoped>
.input-container {
  width: 100%;
  max-width: 1700px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.toolbar {
  display: flex;
  background-color: #f8f9fa;
  padding: 10px;
  border-bottom: 1px solid #eee;
  gap: 5px;
}

.toolbar-button {
  background: none;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 16px;
  cursor: pointer;
  color: #466543;
  transition: all 0.2s ease;
}

.toolbar-button:hover {
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.toolbar-button:active {
  background-color: #dae0e5;
}

.editor-field {
  width: 100%;
  min-height: 150px;
  padding: 12px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  overflow-y: auto;
  background-color: white;
}

.editor-field[contenteditable="true"]:empty:before {
  content: attr(placeholder);
  color: #999;
  pointer-events: none;
}

.editor-field:focus {
  outline: none;
}

/* Styling untuk konten yang diformat */
.editor-field a {
  color: #007bff;
  text-decoration: underline;
}

.editor-field ul,
.editor-field ol {
  margin: 0;
  padding-left: 24px;
}

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
  .toolbar {
    padding: 8px;
    overflow-x: auto;
    flex-wrap: nowrap;
  }

  .toolbar-button {
    font-size: 14px;
    padding: 4px 8px;
  }

  .editor-field {
    min-height: 120px;
    font-size: 14px;
    padding: 10px;
  }
}

@media screen and (max-width: 480px) {
  .toolbar-button {
    font-size: 12px;
    padding: 3px 6px;
  }
}
</style>
