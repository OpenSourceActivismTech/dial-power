import express from 'express';
import { addCampaignToUser,
         deactivateUserById,
         getAllUsers,
         getCallCompleteTwiml,
         getCallStartTwiml,
         getUserById,
         getUserCampaignAssociation,
         getUserCampaigns,
         manageUserById,
         updateUserById,
         startTwilioConnection,
         volunteerCallback,
         connectVolunteerToContact,
         contactCallback } from '../../controllers/users';

import { assignCall, recordAttempt, releaseCall, hangUpCall } from '../../controllers/calls';
// import { passport } from '../auth/local';
const router = express.Router();

// router.use(passport.authenticate('jwt', { session: false }));

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById);
router.route('/:id').put(updateUserById);
router.route('/:id').patch(deactivateUserById);
router.route('/:id/callback').post(volunteerCallback);
router.route('/:id/campaigns').post(addCampaignToUser);
router.route('/:id/campaigns').get(getUserCampaigns);
router.route('/:id/campaigns/:campaign_id').get(getUserCampaignAssociation);
router.route('/:id/campaigns/:campaign_id/calls').get(assignCall);
router.route('/:id/campaigns/:campaign_id/calls').post(startTwilioConnection);
router.route('/:id/campaigns/:campaign_id/calls').delete(hangUpCall);
router.route('/:id/campaigns/:campaign_id/calls/:call_id').delete(releaseCall);
router.route('/:id/campaigns/:campaign_id/calls/:call_id').put(recordAttempt);
router.route('/:id/campaigns/:campaign_id/calls/:call_id/callback').post(contactCallback);
router.route('/:id/campaigns/:campaign_id/calls/bridge').post(getCallCompleteTwiml);
router.route('/:id/campaigns/:campaign_id/calls/start').post(getCallStartTwiml);
router.route('/:id/manage').put(manageUserById);
router.route('/:id/campaigns/:campaign_id/calls/:call_id/connect').post(connectVolunteerToContact);

export default router;
