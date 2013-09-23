pairtime
========

Tool to randomly generate pairings of developers.

## Usage

1. Add some names.
2. Drag people to swap them and keep story owners apart.
3. Lock story owners in place.
4. Shuffle; lock people in who are happy with their pairing.
5. Shuffle and lock until the team is happily paired.
6. (save coming soon)

## Author

G'day! I'm Chris Adams, Aussie pivot, based in SF.

I got sick of people staring at each other in standups, waiting for someone to pair them.

Fun trivia, the first deployment was done to Pivotal CF on the tarmac in Sydney about to fly to San Francisco. If I can grab the client tools and deploy over a tethered connection, on a plane, in the time before takeoff - anyone can deploy to Cloud Foundry.

## Todo

- Allow pairs to be labeled eg. by story (I tried this and it turned out too fiddly)
- Make shuffle more likely to change people (currently uses in-place Fisher-Yates)
- Rework as test-driven code (the whole thing is a spike right now)
- Save team and past pairings to backend (team can then be accessed with a URL)
- Use team knowledge to affect shuffle - eg. avoid pairing people the same way 2 days in a row
- Show past pairings for your team

## Tips

- Click add when all slots are full to add an empty pair.
- You can lock people as soloing by locking an empty slot next to them.

## Feedback/Contact

cadams at pivotallabs dot com

## Screenshot

![PairTime screenshot](https://dl.dropboxusercontent.com/u/417997/GitHub/PairTime.png)