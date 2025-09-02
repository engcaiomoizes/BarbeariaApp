export function getDayOfWeek(date: Date) {
    return date.getDay();
}

export function getDayByTexy(day: string) {
    switch (day) {
        case 'dom': return 0;
        case 'seg': return 1;
        case 'ter': return 2;
        case 'qua': return 3;
        case 'qui': return 4;
        case 'sex': return 5;
        case 'sab': return 6;
    }
}

export function getDayText(day: number) {
    switch (day) {
        case 0: return 'dom';
        case 1: return 'seg';
        case 2: return 'ter';
        case 3: return 'qua';
        case 4: return 'qui';
        case 5: return 'sex';
        case 6: return 'sab';
        default: return "";
    }
}

export function getHorarios(start: string, end: string, gap: number): string[] {
    let horarios: string[] = [];
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    let hour = startHour;
    let minute = startMinute;

    while (hour < endHour || (hour === endHour && minute <= endMinute)) {
        horarios.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);

        minute += gap;
        if (minute >= 60) {
            minute = 0;
            hour++;
        }
    }

    return horarios;
}