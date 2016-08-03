const initialVisionData = [
    {time: '2016/07/30 15:09:30', cpu: 0.42, bw: 322},
    {time: '2016/07/30 15:09:32', cpu: 0.33, bw: 303},
    {time: '2016/07/30 15:09:36', cpu: 0.47, bw: 314},
    {time: '2016/07/30 15:09:38', cpu: 0.42, bw: 322},
    {time: '2016/07/30 15:09:40', cpu: 0.33, bw: 303},
    {time: '2016/07/30 15:09:42', cpu: 0.40, bw: 311}
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
