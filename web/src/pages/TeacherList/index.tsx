import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import api from '../../services/api';

import './styles.css';
import Select from '../../components/Select';


function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(event: FormEvent) {
        event.preventDefault();

         const response = await api.get('classes', {
            params: {
                subject, 
                week_day, 
                time,
            }    
        });

        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="These are the proffys available.">
                <form id="search-teachers" onSubmit={searchTeachers}>
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

                    <Select 
                        name="week_day" 
                        label="Week day"
                        value={week_day}
                        onChange={(event) => { setWeekDay(event.target.value) }}
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
                        type="time" 
                        name="time" 
                        label="Hour"
                        value={time}
                        onChange={(event) => {setTime(event.target.value)}}
                    />

                    <button type="submit">
                        Search
                    </button>
                </form>
            </PageHeader>
            
            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />;
                })}
            </main>
        </div>
    )
}

export default TeacherList;