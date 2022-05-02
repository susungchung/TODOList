var sanitizeHtml = require('sanitize-html');

exports.HTML = (title,body,options)=>{
    return `
    <!doctype html>
    <html>
    <head>
      <title>${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">Main</a></h1>
      ${body}
      ${options}
    </body>
    </html>
    `;
}

/* temp layout to test features are working 
TODO: updated with css*/

exports.tasks = (tasks,create,update_task_id)=>{
    var res = `<table>`;
    tasks.forEach((task)=>{
        if(task.id == update_task_id){
            res+=`
            <tr>
                <form action = '/list/update' method = 'post'>
                    <td><textarea name = 'updated_task'>${sanitizeHtml(task.task_desc)}</textarea></td>
                    <td>
                        <input type = 'hidden' name  = task_id value = ${update_task_id}>
                        <input type = 'submit' value = 'update'>
                    </td>
                </form>`;
        } 
        else{
            var desc = `${sanitizeHtml(task.task_desc)}`;
            if (task.completed){
                desc = '<del>' + desc + '</del>'
            }
            desc = '<td>' + desc + '</td>'
            res += `
            <tr>
                ${desc}
                <td><a href = /list/update/${task.id}>update</a></td>
                `
                
        }
        console.log(typeof task.completed);
        var button_text
        if (task.completed){
            button_text = 'incomplete'
        }
        else{
            button_text = 'complete'
        }
        res += `<td>
                        <form action = '/list/set_complete/' method = 'post'>
                            <input type = 'hidden' name = 'completed' VALUE = ${task.completed}>
                            <input type = 'hidden' name = 'task_id' value = ${task.id}>
                            <input type = 'submit' value = ${button_text}>
                        </form>
            </td>`
        res += `<td>
                    <form action = '/list/delete' method = 'post'>
                        <input type = 'hidden' name = 'task_id' value = ${task.id}> 
                        <input type = 'submit' value = 'delete'>
                    </form>
                </td>
            </tr>`;
    });
    if (create){
        res +=` <tr>
                    <form action = '/list/create' method = 'post'>
                        <td>
                            <textarea name = 'new_task' placeholder = 'new task'></textarea>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                            <input type = 'submit'>
                        </td>
                    </form>
                </tr>`
    }
    res += `</table>`
    res += `
    <style>
      table{
        border-collapse:collapse;
      }
      td{
        border:1px solid black;
      }
      th{
        border:1px solid black;
      }
    </style>`
    return res;
}

exports.option = ()=>{
    return "<a href = /list/create>create</a>"
}