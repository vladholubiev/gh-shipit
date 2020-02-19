import express from 'express';
import {parse} from 'url';
import {approvePR} from '@shelf/gh-sdk';

const app = express();
const port = 5000;

app.get('/:url', async (req, res) => {
  const prURL = req.params.url;
  const {pathname} = parse(prURL);
  const [_, org, repo, __, prNumber] = pathname.split('/');

  if (!org || !repo || !prNumber) {
    return res.send('ok');
  }

  await approvePR({owner: org, repo, pr: Number(prNumber)});

  return res.send(
    '<h1 style="text-align: center; font-size: 5rem; margin-top: 20%; color: limegreen;">Approved!</h1>'
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
