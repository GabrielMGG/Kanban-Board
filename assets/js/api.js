// Busca todas as tarefas do banco e retorna um array
async function getTasks(userId) {
    const { data, error } = await supabaseClient
        .from('tasks')
        .select('*')
        .eq('user_id', userId);
    if (error) {
        console.error(error)
        return null;
    }
    
    return data;
}

// Vai enviar os dados preenchidos pelo usuarioe receber o id da task e o created_ at
async function createTask(dadoTask) {
    const { data, error } = await supabaseClient
        .from('tasks')
        .insert([
            {
                title: dadoTask.title,
                description: dadoTask.description,
                status: dadoTask.status,
                priority: dadoTask.priority,
                due_date: dadoTask.due_date,
                user_id: dadoTask.user_id
            }
        ])
        .select('id, created_at');

    if (error) {
        console.error(error);
        return null
    }

    
    

    return data;

}

// Recebe os dados modificado da task editada e atualiza no supabase pelo id
async function updateTask(taskId, dadoTask) {
    const { data, error } = await supabaseClient
        .from('tasks')
        .update({
            title: dadoTask.title,
            description: dadoTask.description,
            status: dadoTask.status,
            priority: dadoTask.priority,
            due_date: dadoTask.due_date,
        })
        .eq('id', taskId)

    if (error) {
        console.error(error);
        return null
    }
    return data;
}

// Vai receber o novo status e atualizar no supabase pelo id
async function updateTaskStatus(taskId, novoStatus) {
    const { data, error } = await supabaseClient
        .from('tasks')
        .update({ status: novoStatus })
        .eq('id', taskId)

    if (error) {
        console.error(error);
        return null
    }
    return data;
}

//pega o id da task e deleta ela do banco de dados
async function deleteTask(taskId) {
    const { data, error } = await supabaseClient
        .from('tasks')
        .delete()
        .eq('id', taskId)

    if (error) {
        console.error(error);
        return null
    }
    return data;
}


