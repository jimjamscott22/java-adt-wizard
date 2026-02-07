package com.adtpractice.service;

import com.adtpractice.model.Challenge;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ChallengeService {

    @PersistenceContext
    private EntityManager em;

    public List<Challenge> findAll() {
        return em.createQuery("SELECT c FROM Challenge c ORDER BY c.sortOrder", Challenge.class)
                .getResultList();
    }

    public List<Challenge> findByAdtType(String adtType) {
        return em.createQuery("SELECT c FROM Challenge c WHERE c.adtType = :adtType ORDER BY c.sortOrder", Challenge.class)
                .setParameter("adtType", adtType)
                .getResultList();
    }

    public Challenge findById(Long id) {
        return em.find(Challenge.class, id);
    }

    public List<String> getAvailableAdtTypes() {
        return em.createQuery("SELECT DISTINCT c.adtType FROM Challenge c ORDER BY c.adtType", String.class)
                .getResultList();
    }

    public Challenge save(Challenge challenge) {
        if (challenge.getId() == null) {
            em.persist(challenge);
            return challenge;
        }
        return em.merge(challenge);
    }
}
