import React from 'react';
import Statistic from './Statistic';

const Statistics = ({ votes }) => {
    const votesTotal = votes.good + votes.bad + votes.neutral;
    const average = votesTotal > 0 ? (votes.good - votes.bad) / votesTotal : 0;
    const positivePercentage = votesTotal > 0 ? votes.good / votesTotal * 100 : 0;
    return (
        <div>
            <h2>Statistiikka</h2>
            {votesTotal === 0 && <p>Ei yhtään ääntä annettu</p>}
            {votesTotal > 0 && 
                <table><tbody>
                    { votes.good > 0 && <Statistic name="Hyvä" value={votes.good} /> }
                    { votes.neutral > 0 && <Statistic name="Neutraali" value={votes.neutral} /> }
                    { votes.bad > 0 && <Statistic name="Huono" value={votes.bad} /> }
                    <Statistic name="Keskiarvo" value={average.toFixed(1)} />
                    <Statistic name="Positiivisia" value={positivePercentage.toFixed(1) + ' %'} />
                </tbody></table>
            }
        </div>
    );
};

export default Statistics;