import React, { useRef  } from "react";
import styles from './LoadMyFile.module.css';

const LoadMyFile = ({ items, onClickFileAdd }) => {

    const fileInput = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        let file = fileInput.current.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (e) {

            let fileList = reader.result.split('\n');

            if (fileList.includes('\r')) {
                alert(`В вашем файле есть пустая строка. Отредактируйте файл`);
                return
            };

            let dublicate = items.find(item => fileList.includes(item.value));

            if (dublicate) {
                alert(`В вашем списке уже есть задача: ${dublicate.value} Удалите её из файла, а также все повторяющиеся задачи`)
                return
            }

            onClickFileAdd(fileList);
        };

        fileInput.current.value = "";
    };
   
    return (
        <form onSubmit={handleSubmit} className={styles.load_file}>
            <label>
                Загрузите файл .txt &nbsp;
                <input type='file' ref={fileInput} />
            </label>
            <button type="submit">Отправить</button>
        </form>
    );
}

export default LoadMyFile;