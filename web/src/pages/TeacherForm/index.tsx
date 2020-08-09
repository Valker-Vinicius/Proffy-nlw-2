import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        })

        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(event: FormEvent) {
        event.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Registered successfully!');

            history.push('/');
        }).catch(() => {
            alert('Register error!');
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Thank you for share your knowledge!"
                description="The first step is fill the form below."
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Your datas</legend>

                        <Input
                            name="name"
                            label="Complete name"
                            value={name}
                            onChange={(event) => { setName(event.target.value) }}
                        />

                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(event) => { setAvatar(event.target.value) }}
                        />

                        <Input
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(event) => { setWhatsapp(event.target.value) }}
                        />

                        <Textarea
                            name="bio"
                            label="Biography"
                            value={bio}
                            onChange={(event) => { setBio(event.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>About your class</legend>

                        <Select
                            name="subject"
                            label="Subject"
                            value={subject}
                            onChange={(event) => { setSubject(event.target.value) }}
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Biology', label: 'Biology' },
                                { value: 'Chemical', label: 'Chemical' },
                                { value: 'English', label: 'English' },
                                { value: 'Geography', label: 'Geography' },
                                { value: 'History', label: 'History' },
                                { value: 'Mathematic', label: 'Mathematic' },
                                { value: 'Physical Education', label: 'Physical Education' },
                                { value: 'Physics', label: 'Physics' },
                                { value: 'Portuguese', label: 'Portuguese' },
                            ]}
                        />

                        <Input
                            name="cost"
                            label="Cost of your class per hour"
                            value={cost}
                            onChange={(event) => { setCost(event.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Available schedules
                            <button type="button" onClick={addNewScheduleItem}>
                                + New schedule
                            </button>
                        </legend>
                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Week day"
                                        value={scheduleItem.week_day}
                                        onChange={event => setScheduleItemValue(index, 'week_day', event.target.value)}
                                        options={[
                                            { value: '0', label: 'Sunday' },
                                            { value: '1', label: 'Monday' },
                                            { value: '2', label: 'Tuesday' },
                                            { value: '3', label: 'Wednesday' },
                                            { value: '4', label: 'Thursday' },
                                            { value: '5', label: 'Friday' },
                                            { value: '6', label: 'Saturday' },
                                        ]}
                                        />
                                    <Input 
                                        name="from" 
                                        label="From:" 
                                        value={scheduleItem.from}
                                        type="time"
                                        onChange={event => setScheduleItemValue(index, 'from', event.target.value)}
                                        />
                                    <Input 
                                        name="to" 
                                        label="To:" 
                                        value={scheduleItem.to}
                                        type="time"
                                        onChange={event => setScheduleItemValue(index, 'to', event.target.value)}
                                    />
                                </div>
                            )
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="WARNING!" />
                            Important! <br />
                            Fill all datas!
                        </p>
                        <button type="submit">
                            Register datas
                        </button>
                    </footer>
                </form>

            </main>
        </div>
    )
}

export default TeacherForm;