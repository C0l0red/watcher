import CallTimeService from './call-time.service';
import CallTimeModel from './call-time.schema';

const callTimeService = new CallTimeService(CallTimeModel);

export { callTimeService };
