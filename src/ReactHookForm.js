import React, {useState} from 'react'; 
import {useForm, Controller} from "react-hook-form";
import {Modal, message, Input, Radio, DatePicker} from 'antd';

const RegistrationForm = () =>{ 

const {handleSubmit, control, formState: {errors}, watch} = useForm();
const [isModalVisible, setIsModalVisible] = useState(false);
const [formData, setFormData] = useState({});

const onSubmit = (value) =>{
    setFormData(value);
    setIsModalVisible(true);
    console.log(value);
    message.success('Успешно зарегистрировано');
}



return(
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label>Имя:</label>
            <Controller
                name = 'name'
                control={control}
                rules = {{
                    required: 'Поле обязательно для заполнения',
                }}
                render = {({field}) => <Input {...field} placeholder = "Имя"/>}
            />
            <p>{errors.name?.message}</p>
        </div>
        <div>
            <label>Email:</label>
            <Controller
                name = "email"
                control={control}
                rules={{
                    required: 'Поле обязательно для заполнения',
                    pattern: {
                        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                        message: 'Введите корректный email',
                    }
                }}
                render={({field}) => <Input {...field} placeholder = 'Email'/>}
            />
            <p>{errors.email?.message}</p>
        </div>
        <div>
            <label>Пароль:</label>
            <Controller
                name = 'password'
                control={control}
                rules = {{
                    required: 'Поле обязательно для заполнения',
                    minLength: {
                        value: 6,
                        message: 'Пароль должен быть не менее 6 символов',
                      },
                    pattern: {
                        value: /^(?=.*[A-Z]).*$/,
                        message: 'Пароль должен содержать как минимум одну заглавную букву',
                    }
                }}
                render = {({field}) => <Input {...field} type="password" placeholder = "Пароль"/>}
            />
            <p>{errors.password?.message}</p>
        </div>
        <div>
            <label>Подтверждение пароля:</label>
            <Controller
                name = 'passwordConfirm'
                control={control}
                rules = {{
                    required: 'Поле обязательно для заполнения',
                    validate: (value) => value === watch('password') || 'Подтверждение пароля не совпадает',
                }}
                render = {({field}) => <Input {...field} type="password" placeholder = "Подтверждение пароля"/>}
            />
            <p>{errors.passwordConfirm?.message}</p>
        </div>
        <div>
            <label>Дата рождения:</label>
            <Controller
                name="date"
                control={control}
                rules = {{
                    required: 'Поле обязательно для заполнения',
                }}
                render={({ field }) => <DatePicker {...field} placeholder = "Дата рождения" />
            }
            />
            <p>{errors.date?.message}</p>
        </div>
        <div>
            <label>Пол:</label>
            <Controller
                name='gender'
                control={control}
                rules = {{
                    required: 'Поле обязательно для заполнения',
                }}
                render={({field}) => (
                    <Radio.Group {...field}>
                        <Radio value="male">Мужской</Radio>
                        <Radio value="female">Женский</Radio>
                    </Radio.Group>
                )}
            />
            <p>{errors.gender?.message}</p>
        </div>
        <div>
            <label>Номер телефона:</label>
            <Controller
                name = 'phone'
                control={control}
                rules = {{
                    required: 'Поле обязательно для заполнения',
                }}
                render = {({field}) => <Input type="number" {...field} placeholder = "Номер телефона"/>}
            />
            <p>{errors.phone?.message}</p>
        </div>
        <button type="submit">
            Отправить
        </button>
    </form>
    <Modal
      title="Данные формы"
      visible={isModalVisible}
      onOk={() => setIsModalVisible(false)}
      onCancel={() => setIsModalVisible(false)}
    >
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </Modal>
    </>
)


}

export default RegistrationForm;