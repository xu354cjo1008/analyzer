const initialVisionData = [
    {number: 0, time: '2016/07/30 15:09:30', cpu: 0.42, bw: 322},
    {number: 1, time: '2016/07/30 15:09:32', cpu: 0.33, bw: 303},
    {number: 2, time: '2016/07/30 15:09:36', cpu: 0.47, bw: 314},
    {number: 3, time: '2016/07/30 15:09:38', cpu: 0.42, bw: 322},
    {number: 4, time: '2016/07/30 15:09:40', cpu: 0.33, bw: 303},
    {number: 5, time: '2016/07/30 15:09:42', cpu: 0.40, bw: 311},
    {number: 6, time: '2016/07/30 15:09:44', cpu: 0.41, bw: 321}
];

export function getVisionData(req) {
    let visionData = req.session.visionDate;
    if (!visionData) {
        visionData = initialVisionData;
        req.session.visionData = visionData;
    }
    return visionData;
}

export default function load(req) {
    return new Promise((resolve, reject) => {
        // make async call to database
        setTimeout(() => {
          if (Math.random() < 0.33) {
            reject('Vision load fails 33% of the time. You were unlucky.');
          } else {
            resolve(getVisionData(req));
          }
        }, 1000); // simulate async load
    })
}
