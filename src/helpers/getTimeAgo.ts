export const getTimeAgo = ( dateString: string ) => {
    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now.getTime()) - past.getTime()) /1000

    const intervals = [
        { label: 'ano', seconds: 60 * 60 * 24 * 365 },
        { label: 'mês', seconds: 60 * 60 * 24 * 30 },
        { label: 'dia', seconds: 60 * 60 * 24 },
        { label: 'hora', seconds: 60 * 60 },
        { label: 'minuto', seconds: 60 },
        { label: 'segundo', seconds: 1 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
          return `${count} ${interval.label}${count > 1 ? 's' : ''} atrás`;
        }
    }
      return 'Agora'
}