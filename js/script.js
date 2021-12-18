const start = function () {
  const url = 'https://api.github.com/users/vitorgaletti';
  const client_id = '89576ba2747324755091';
  const client_secret = '038638c8d450df8c6f417ee215d97b354aee7012';

  getGiHubProfileInfos(url, client_id, client_secret);
  getPinnedRepositories();
};

async function getGiHubProfileInfos(url, client_id, client_secret) {
  try {
    const profileResponse = await fetch(
      `${url}?client_id=${client_id}&client_secret=${client_secret}`
    );

    if (!profileResponse.ok) {
      throw new Error('Falha de conexão');
    }

    const data = await profileResponse.json();
    renderProfile(data);
    renderLinks(data);
  } catch (error) {
    alert(error);
  }
}

async function getPinnedRepositories() {
  try {
    const response = await fetch(
      `https://gh-pinned-repos.egoist.sh/?username=vitorgaletti`
    );

    if (!response.status) {
      throw new Error('Falha de conexão');
    }

    const data = await response.json();

    for (const rep of data) {
      const repositories = {
        link: rep.link,
        repository: rep.repo,
        description: rep.description,
        stars: rep.stars,
        forks: rep.forks,
        language: rep.language,
        languageColor: rep.languageColor
      };

      renderProjects(repositories);
    }
  } catch (error) {
    alert(error);
  }
}

function renderProfile(data) {
  const profile = document.querySelector('.profile');
  const html = `
  <div class="avatar">
    <img
      src="${data.avatar_url}"
      alt="Foto de perfil"
    />
    </div>
    <div class="profile-details">
        <h3>${data.name}</h3>
        <p>${data.bio}</p>
    </div>
  `;
  profile.innerHTML = html;
}

function renderLinks(data) {
  const links = document.querySelector('.links');
  const html = `
    <ul>
        <li>
            <a href="https://www.google.com.br/maps/place/Brasil/@-13.705549,-69.6504673,4z/data=!3m1!4b1!4m5!3m4!1s0x9c59c7ebcc28cf:0x295a1506f2293e63!8m2!3d-14.235004!4d-51.92528" target="_blank">
            <img
              src="./assets/map-pin.svg"
              alt="Localização"
              title="Localização"
            />
              <span>${data.location}</span>
            </a>
        </li>
        <li>
            <a href="https://www.rocketseat.com.br/" target="_blank">
              <img
                src="./assets/briefcase.svg"
                alt="Trabalho"
                title="Trabalho"
              />
              <span>Rocketseat</span>
            </a>
        </li>
        <li>
            <a href="${data.html_url}" target="_blank">
              <img src="./assets/github.svg" alt="Github" title="Github" />
              <span>${data.login}</span>
            </a>
        </li>
        <li>
            <a href="https://www.linkedin.com/in/vitorgaleti/" target="_blank">
              <img
                src="./assets/linkedin.svg"
                alt="Linkedin"
                title="LinkedIn"
              />
              <span>vitorgaleti</span>
            </a>
        </li>
        <li>
              <a href="https://twitter.com/${data.twitter_username}" target="_blank">
                <img src="./assets/twitter.svg" alt="Twitter" title="Twitter" />
                <span>${data.twitter_username}</span>
              </a>
        </li>
        <li>
              <a href="${data.blog}" target="_blank">
                <img src="./assets/globe.svg" alt="Website" title="Website" />
                <span>${data.blog}</span>
              </a>
          </li>
          <li>
              <a href="mailto:${data.email}" target="_blank">
                <img src="./assets/mail.svg" alt="Email" title="Email" />
                <span>${data.email}</span>
              </a>
          </li>
    </ul>
  `;

  links.innerHTML = html;
}

function renderProjects(rep) {
  const projects = document.querySelector('.main-projects');

  const {
    link,
    repository,
    description,
    stars,
    forks,
    language,
    languageColor
  } = rep;

  const html = `

  <div class="project" onclick="window.open('${link}')">
      <div class="project-title">
          <img src="./assets/folder.svg" alt="Pasta" />
          <h3>${repository}</h3>
      </div>
      <div class="project-description">
          <p>${description}.</p>
      </div>

      <div class="project-footer">
          <div class="project-git">
              <img src="./assets/star.svg" alt="Favorito" /> <span>${stars}</span>
              <img src="./assets/git-branch.svg" alt="Git Branch" /> <span>${forks}</span>
          </div>

          <div class="project-language">
              <div class="language" style="background:${languageColor}"></div>
                <p>${language}</p>
          </div>
      </div>
    </div>

  `;

  projects.innerHTML += html;
}

start();
