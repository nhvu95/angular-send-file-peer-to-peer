package com.f2f.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.f2f.backend.ds.Peer;

@Repository
public interface PeerRepository extends JpaRepository<Peer, Long> {

}
