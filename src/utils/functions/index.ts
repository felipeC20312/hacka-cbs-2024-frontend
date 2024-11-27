export function formatDateRange(dateRange: string | undefined): string {
  debugger;
  const monthsAbbreviations: { [key: number]: string } = {
    1: 'jan.',
    2: 'fev.',
    3: 'mar.',
    4: 'abr.',
    5: 'mai.',
    6: 'jun.',
    7: 'jul.',
    8: 'ago.',
    9: 'set.',
    10: 'out.',
    11: 'nov.',
    12: 'dez.',
  };

  if (dateRange) {
    const [startDate, endDate] = dateRange.split(' a ');

    const formatDate = (dateStr: string): string => {
      const [year, month, day] = dateStr.split('-').map(Number);
      const formattedMonth = monthsAbbreviations[month];
      const formattedDay = day.toString().padStart(2, '0');
      return `${formattedDay}.${formattedMonth}`;
    };

    return `${formatDate(startDate)} a ${formatDate(endDate)}`;
  }

  return '---';
}
