package analitika.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import analitika.IntegrationTest;
import analitika.domain.Grafikon;
import analitika.repository.GrafikonRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link GrafikonResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class GrafikonResourceIT {

    private static final String DEFAULT_REGION = "AAAAAAAAAA";
    private static final String UPDATED_REGION = "BBBBBBBBBB";

    private static final Integer DEFAULT_PROMET = 1;
    private static final Integer UPDATED_PROMET = 2;

    private static final String ENTITY_API_URL = "/api/grafikons";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private GrafikonRepository grafikonRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGrafikonMockMvc;

    private Grafikon grafikon;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Grafikon createEntity(EntityManager em) {
        Grafikon grafikon = new Grafikon().region(DEFAULT_REGION).promet(DEFAULT_PROMET);
        return grafikon;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Grafikon createUpdatedEntity(EntityManager em) {
        Grafikon grafikon = new Grafikon().region(UPDATED_REGION).promet(UPDATED_PROMET);
        return grafikon;
    }

    @BeforeEach
    public void initTest() {
        grafikon = createEntity(em);
    }

    @Test
    @Transactional
    void getAllGrafikons() throws Exception {
        // Initialize the database
        grafikonRepository.saveAndFlush(grafikon);

        // Get all the grafikonList
        restGrafikonMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(grafikon.getId().intValue())))
            .andExpect(jsonPath("$.[*].region").value(hasItem(DEFAULT_REGION)))
            .andExpect(jsonPath("$.[*].promet").value(hasItem(DEFAULT_PROMET)));
    }

    @Test
    @Transactional
    void getGrafikon() throws Exception {
        // Initialize the database
        grafikonRepository.saveAndFlush(grafikon);

        // Get the grafikon
        restGrafikonMockMvc
            .perform(get(ENTITY_API_URL_ID, grafikon.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(grafikon.getId().intValue()))
            .andExpect(jsonPath("$.region").value(DEFAULT_REGION))
            .andExpect(jsonPath("$.promet").value(DEFAULT_PROMET));
    }

    @Test
    @Transactional
    void getNonExistingGrafikon() throws Exception {
        // Get the grafikon
        restGrafikonMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }
}
