'use strict';

// UI variables
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search_input');
const userList = document.querySelector('.user-list');
const infoModalContent = document.getElementById('content');
const infoModalCloseIcon = document.getElementById('info-modal-close');
const infoModalTitle = document.querySelector('.info-modal-title');

const showModal = (selector) => {
    document.getElementById(selector).style.display = 'block';
}

const closeModal = (selector) => {
    document.getElementById(selector).style.display = 'none';
}

const clearInput = input => input.value = '';

const renderProfileCard = (users) => {
    users.forEach((user) => {
        const profileCard = document.createElement('div');
        profileCard.className = 'profile-card';
        profileCard.innerHTML = `
            <div class="card-header">
                <img src="${user.avatar_url}" alt="${user.login}">
            </div>
            <div class="card-body">
                <h2>${user.login}</h2>
                <div>
                    <button data-login=${user.login} class="repos-url">Repos</button>
                </div>
                <div>
                    <button data-follower=${user.login} class="followers-url">Followers</button>
                </div>
                <div>
                    <button>
                        <a href="${user.html_url}" target="_blank">See Profile</a>
                    </button>
                </div>
            </div>
        `;
        userList.appendChild(profileCard);
    });
}

const renderGithubUsers = () => {
    const USERS = 'https://api.github.com/users';

    // show loading
    showModal('loading-modal');
    fetch(USERS, {mode: 'cors'})
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            Swal.fire('Could not load GitHub users. Something unexpected happened.');
            closeModal('loading-modal');
        }
    })
    .then((users) => {
        renderProfileCard(users);
        // hide loading
        closeModal('loading-modal');
    })
    .catch((err) => {
        console.log(err);
    });

}

const loadRepos = (repos) => {
    let repoItems = repos.map((repo) => {
        return `<div class="repo-item">
                    <a class="repo-link" href="${repo.html_url}">${repo.name}</a>
                </div>`;
    });
    repoItems = repoItems.join('');
    infoModalContent.innerHTML = repoItems;
}

const loadFollowers = (followers) => {
    let followerItems = followers.map((follower) => {
        return `<div class="follower-item">
                    <a href="${follower.html_url}" target="_blank">
                        <img src="${follower.avatar_url}" alt=${follower.login}>
                    </a>
                    <h2>${follower.login}</h2>
                </div>`;
    });
    followerItems = followerItems.join('');
    infoModalContent.innerHTML = followerItems;
}

// load repos or followers
userList.addEventListener('click', e => {
    const element = e.target.classList;

    if (element.contains('repos-url')) {
        const username = e.target.dataset.login;
        const REPOS = `https://api.github.com/users/${username}/repos`;
        // show loading
        showModal('loading-modal');
        fetch(REPOS, {mode: 'cors'})
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                Swal.fire('Could not load repositories, try again later.');
                closeModal('loading-modal');
            }
        })
        .then((repos) => {
            loadRepos(repos);
            document.querySelector('.modal-content').style.width = '600px';
            infoModalTitle.textContent = `${username}'s repos`;
            showModal('info-modal');
            // hide loading
            closeModal('loading-modal');
        })
        .catch((err) => {
            console.log(err);
        });
    } else if (element.contains('followers-url')) {
        const username = e.target.dataset.follower;
        const FOLLOWERS = `https://api.github.com/users/${username}/followers`;
        // show loading
        showModal('loading-modal');
        fetch(FOLLOWERS, {mode: 'cors'})
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                Swal.fire("Couldn't load followers, try again.");
                closeModal('loading-modal');
            }
        })
        .then((followers) => {
            // hide loading
            loadFollowers(followers);
            document.querySelector('.modal-content').style.width = '500px';
            infoModalTitle.textContent = `${username}'s followers`;
            showModal('info-modal');
            // hide loading
            closeModal('loading-modal');
        })
        .catch((err) => {
            console.log(err);
        });
    }

});

const loadProfile = (profile) => {
    infoModalContent.innerHTML = `
        <img class="profile-img" src="${profile.avatar_url}" alt="${profile.login}">
        <div class="profile-body">
            <div>
                <h2 class="heading">Login: ${profile.login}</h2>
            </div>
            <div>
                <h3 class="heading">Followers: ${profile.followers}</h3>
            </div>
            <div>
                <h4 class="heading">Following: ${profile.following}</h4>
            </div>
            <div>
                <h5 class="heading">Public repos: ${profile.public_repos}</h5>
            </div>
            <div>
                <h6 class="heading">Location: ${profile.location || 'unknown'}</h6>
            </div>
            <br>
            <div>
                <a href="${profile.html_url}">Profile</a>
            </div>
        </div>
    `;
}

// search github profile
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const PROFILE = `https://api.github.com/users/${searchInput.value}`;
    
    // show loading
    showModal('loading-modal');
    fetch(PROFILE, {mode: 'cors'})
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            Swal.fire('Could not find github profile.');
            closeModal('loading-modal');
            clearInput(searchInput);
        }
    })
    .then((profile) => {
        loadProfile(profile);
        infoModalTitle.textContent = profile.name || 'Profile Info';
        document.querySelector('.modal-content').style.width = '500px';
        showModal('info-modal');
        clearInput(searchInput);
        // hide loading
        closeModal('loading-modal');
    })
    .then((err) => {
        if (err) {
            console.log(err);
        }
    });

});

// close info modal
infoModalCloseIcon.addEventListener('click', () => {
    closeModal('info-modal');
});

document.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
        closeModal('info-modal');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderGithubUsers();
});