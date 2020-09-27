import { TagsService, ArticlesService } from "@/common/api.service";
import { FETCH_ARTICLES, FETCH_TAGS } from "./actions.type"
import { FETCH_STARTS, FETCH_END, SET_TAGS, UPDATE_ARTICLE_IN_LIST } from "./mutations.type"


const state = {
  tags: [],
  articles: [],
  isLoading: true,
  articlesCount: 0
}

const getters = {
  articlesCount(state) {
    return state.articlesCount;
  },
  articles(state) {
    return state.articles;
  },
  isLoading(state) {
    return state.isLoading;
  },
  tags(state) {
    return state.tags;
  }
}

const actions = {
  [FETCH_ARTICLES]({ commit }, params) {
    const { type, filters } = params;
    commit(FETCH_STARTS);
    return ArticlesService.query(type, filters)
      .then(({ data }) => {
          commit(FETCH_END, data);
        })
        .catch(error => {
          throw new Error(error);
        })
  },
  [FETCH_TAGS]({ commit }) {
    return TagsService.get()
      .then(({ data }) => {
        commit(SET_TAGS, data.tags);
      })
      .catch(error => {
        throw new Error(error);
      })
  }
}

const mutations = {
  [SET_TAGS](state, tags) {
    state.tags = tags;
  },
  [FETCH_STARTS](state) {
    state.isLoading = true;
  },
  [FETCH_END](state) {
    state.isLoading = false;
  },
  [UPDATE_ARTICLE_IN_LIST](state, data) {
    state.articles = state.articles.map(article => {
      if (article !== data.slug) {
        return article;
      }
      article.favorited = data.favorited;
      article.favoritesCount = data.favoritesCount;
      return article;
    })
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
