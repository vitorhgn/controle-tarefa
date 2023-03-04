export default function handleStorage() {

    const STORAGE_KEY = 'userLogged';

    const save =(data)=>{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    const get = () => {
        const data = localStorage.getItem(STORAGE_KEY);
        if(!data) {
            return false;
        }
        try {
            return JSON.parse(data);
        }catch(error){
            return false;
        }
    }

    const isSupervisor = () => {
        const user = get();
        if(!user){
            return false;
        }
        return user.direito === 'S';
    }

    const clear = () => {
        localStorage.setItem(STORAGE_KEY, '');
    }

    return {
        save,
        get,
        clear,
        isSupervisor
    }

}