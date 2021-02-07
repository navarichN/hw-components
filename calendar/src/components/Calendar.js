import '../App.css';

export function Calendar(props) {
    let daysInWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    let daysInWeekShort = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    let monthsInYear = ['Январь', 'Февраль','Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let dayTodayNum = props.date.getDate();
    let dayTodayName = daysInWeek[props.date.getDay()-1];
    let monthTodayNum = props.date.getMonth();
    let monthTodayName = monthsInYear[monthTodayNum];
    let yearTodayNum = props.date.getFullYear();
    let quantityOfDays = getDaysInMonth(props.date);
    //^ можно изменить кол-во дней на большее или меньшее, 
    //чтобы посмотреть как работает, если в конце есть дни из др месяца

    let arrWithDays = [[], [], [], [], []];

    let d = new Date();
    d.setMonth(d.getMonth() - 1);
    let quantityOfDaysPrevMonth = getDaysInMonth(d);

    const orderFirstMonthsDayInWeek = new Date(2021,props.date.getMonth(),1).getDay();
    //^ можно изменить день недели для первого дня месяца, дав переменной значение от 1-7, 
    //чтобы посмотреть как работает, если в начале есть дни из др месяца

    function getDaysInMonth(anyDateInMonth) {
        return new Date(anyDateInMonth.getFullYear(), 
                        anyDateInMonth.getMonth()+1, 
                        0).getDate();
    }
    
    function formsOrderOfDays(i = 0, n = 7, arr = 0, day = 1) {
        if(day >= quantityOfDays) return ;

        let prevMonthDay = orderFirstMonthsDayInWeek - 2;
        for(i; i <= n; i++) {
            if (i < orderFirstMonthsDayInWeek) {
                arrWithDays[arr].push(quantityOfDaysPrevMonth - prevMonthDay)
                prevMonthDay -= 1
                continue
            }

            (day > quantityOfDays) ? 
            arrWithDays[arr].push(day-quantityOfDays) : 
            arrWithDays[arr].push(day)
            
            day += 1
        }
        return formsOrderOfDays(i, n += 7, arr += 1, day)
    }
    
    formsOrderOfDays(1,7,0)

    return (
        <div className="ui-datepicker">
        <div className="ui-datepicker-material-header">
            <div className="ui-datepicker-material-day">{dayTodayName}</div>
            <div className="ui-datepicker-material-date">
                <div className="ui-datepicker-material-day-num">{dayTodayNum}</div>
                <div className="ui-datepicker-material-month">{monthTodayName}</div>
                <div className="ui-datepicker-material-year">{yearTodayNum}</div>
            </div>
        </div>
        <div className="ui-datepicker-header">
            <div className="ui-datepicker-title">
            <span className="ui-datepicker-month">{monthTodayName}</span>&nbsp;<span className="ui-datepicker-year">{yearTodayNum}</span>
            </div>
        </div>
        <table className="ui-datepicker-calendar">
            <colgroup>
                <col></col>
                <col></col>
                <col></col>
                <col></col>
                <col></col>
                <col className="ui-datepicker-week-end"></col>
                <col className="ui-datepicker-week-end"></col>
            </colgroup>
            <thead>
                <tr>
                    {daysInWeekShort.map((day, i) => <th scope="col" key = {i} title={daysInWeek[i]}>{day}</th>)}
                </tr>
            </thead>
            <tbody>
                {arrWithDays.map((arr, i) => {
                    return <tr key = {i + arr}>
                                {   
                                    arr.map((el, j) => {
                                        if(i === 0 && el > 20 || i > 3 && el < 7) {
                                            return <td className="ui-datepicker-other-month" key = {j + el}>{el}</td>
                                        }
                                        if(el === dayTodayNum) {
                                            return <td className="ui-datepicker-today" key = {j + el}>{el}</td>
                                        } else {
                                            return <td key = {j + el}>{el}</td>
                                        } 
                                    })
                                }
                            </tr>
                })}
            </tbody>
        </table>
        </div>
    )
}